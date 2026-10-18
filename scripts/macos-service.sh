#!/bin/bash
# Run Human Atlas on a Mac as a background service (launchd), independent of any terminal window,
# and optionally keep the Mac's IP address fixed.
#
#   bash scripts/macos-service.sh install     start now and at every login; restarted automatically if it stops
#   bash scripts/macos-service.sh status      is it running, and which addresses to open on other devices
#   bash scripts/macos-service.sh restart     after updating scripts/serve.mjs (a new `npm run build` needs no restart)
#   bash scripts/macos-service.sh logs        follow the server log
#   bash scripts/macos-service.sh uninstall   stop and remove the service
#   bash scripts/macos-service.sh pin-ip      keep the current IP address on this network service (asks for your password)
#   bash scripts/macos-service.sh unpin-ip    go back to an automatic (DHCP) address
#
# PORT (default 3016), TLS_CERT and TLS_KEY given to `install` are stored in the service.
set -euo pipefail

LABEL=id.human-atlas.server
REPO=$(cd "$(dirname "$0")/.." && pwd)
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
LOG="$HOME/Library/Logs/human-atlas.log"
DOMAIN="gui/$(id -u)"

[ "$(uname)" = Darwin ] || { echo "This script is for macOS. For Linux, see the systemd example in docs/INTRANET.md."; exit 1; }

xml() { printf '%s' "$1" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g'; }
absolute() { (cd "$(dirname "$1")" && printf '%s/%s' "$(pwd)" "$(basename "$1")"); }
# Reads a value this script wrote into the plist's EnvironmentVariables.
setting() { [ -f "$PLIST" ] || return 0; sed -n "s|.*<key>$1</key><string>\(.*\)</string>.*|\1|p" "$PLIST" | head -n 1; }

# IFACE, IP and SERVICE of the connection that carries the default route.
network() {
  IFACE=$(route -n get default 2>/dev/null | awk '/interface:/{print $2}')
  [ -n "$IFACE" ] || { echo "No active network connection found."; exit 1; }
  IP=$(ipconfig getifaddr "$IFACE" || true)
  SERVICE=$(networksetup -listnetworkserviceorder | awk -v dev="$IFACE" '
    /^\([0-9*]+\) / { sub(/^\([0-9*]+\) /, ""); name = $0 }
    index($0, "Device: " dev ")") { print name; exit }')
}

addresses() {
  local port scheme host
  port=$(setting PORT); port=${port:-3016}
  scheme=http; [ -n "$(setting TLS_CERT)" ] && scheme=https
  host=$(scutil --get LocalHostName 2>/dev/null || true)
  network
  echo "Open on other devices in this network:"
  [ -n "$IP" ] && echo "  $scheme://$IP:$port"
  [ -n "$host" ] && echo "  $scheme://$host.local:$port   (name stays the same when the IP changes)"
  return 0
}

status() {
  local state port scheme code
  if ! launchctl print "$DOMAIN/$LABEL" >/dev/null 2>&1; then echo "Human Atlas service is not installed."; return 1; fi
  state=$(launchctl print "$DOMAIN/$LABEL" | awk -F' = ' '/^[[:space:]]*state = /{print $2; exit}')
  port=$(setting PORT); port=${port:-3016}
  scheme=http; [ -n "$(setting TLS_CERT)" ] && scheme=https
  code=$(curl -s -k -o /dev/null -w '%{http_code}' --max-time 3 "$scheme://localhost:$port/" || true)
  echo "Human Atlas service: ${state:-unknown}, answering on port $port: $([ "$code" = 200 ] && echo yes || echo "no (HTTP $code)")"
  [ "$code" = 200 ] || echo "See the log: bash scripts/macos-service.sh logs"
  addresses
}

install() {
  local node port env
  node=$(command -v node) || { echo "Node.js was not found. Install Node.js 22 or newer from https://nodejs.org"; exit 1; }
  [ -f "$REPO/dist/index.html" ] || { echo "No build yet. Run first: npm run build"; exit 1; }
  case "$REPO" in
    "$HOME/Desktop"*|"$HOME/Documents"*|"$HOME/Downloads"*)
      echo "Warning: macOS may block background services from reading Desktop, Documents and Downloads."
      echo "If the service does not answer, move this folder (for example to ~/dev) and install again." ;;
  esac
  port=${PORT:-3016}
  env="    <key>PORT</key><string>$(xml "$port")</string>"
  if [ -n "${TLS_CERT:-}${TLS_KEY:-}" ]; then
    [ -f "${TLS_CERT:-}" ] && [ -f "${TLS_KEY:-}" ] || { echo "TLS_CERT and TLS_KEY must both point to existing files."; exit 1; }
    env="$env
    <key>TLS_CERT</key><string>$(xml "$(absolute "$TLS_CERT")")</string>
    <key>TLS_KEY</key><string>$(xml "$(absolute "$TLS_KEY")")</string>"
  fi
  mkdir -p "$(dirname "$PLIST")" "$(dirname "$LOG")"
  # caffeinate keeps the Mac from idle sleep (and from system sleep on power) while the server runs.
  cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/caffeinate</string><string>-is</string>
    <string>$(xml "$node")</string><string>$(xml "$REPO/scripts/serve.mjs")</string>
  </array>
  <key>WorkingDirectory</key><string>$(xml "$REPO")</string>
  <key>EnvironmentVariables</key>
  <dict>
$env
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>10</integer>
  <key>ProcessType</key><string>Standard</string>
  <key>StandardOutPath</key><string>$(xml "$LOG")</string>
  <key>StandardErrorPath</key><string>$(xml "$LOG")</string>
</dict>
</plist>
EOF
  plutil -lint "$PLIST" >/dev/null
  launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
  # A service that was just stopped can take a moment to unload.
  for attempt in 1 2 3 4 5; do
    launchctl bootstrap "$DOMAIN" "$PLIST" 2>/dev/null && break
    [ "$attempt" = 5 ] && { echo "launchctl could not start the service."; exit 1; }
    sleep 1
  done
  echo "Installed. Human Atlas now runs in the background and starts again at every login."
  if /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate 2>/dev/null | grep -q enabled; then
    echo "The macOS firewall is on. If other devices cannot connect, allow Node.js once:"
    echo "  sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add \"$node\" --unblockapp \"$node\""
  fi
  sleep 2
  status || true
}

uninstall() {
  launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
  rm -f "$PLIST"
  echo "Human Atlas service removed."
}

pin_ip() {
  network
  [ -n "$IP" ] && [ -n "$SERVICE" ] || { echo "Could not read the current address of $IFACE."; exit 1; }
  echo "Keeping $IP on \"$SERVICE\" ($IFACE). Router, DNS and subnet still come from the network (DHCP)."
  sudo networksetup -setmanualwithdhcprouter "$SERVICE" "$IP"
  echo "Done. This Mac now always uses $IP on \"$SERVICE\"."
  echo "If this Mac also joins other networks (for example Wi-Fi at home), run 'unpin-ip' there."
  echo "Most robust: also reserve $IP for this Mac in the router (DHCP reservation) for MAC address $(ifconfig "$IFACE" | awk '/ether/{print $2; exit}')."
}

unpin_ip() {
  network
  [ -n "$SERVICE" ] || { echo "Could not find the network service for $IFACE."; exit 1; }
  sudo networksetup -setdhcp "$SERVICE"
  echo "\"$SERVICE\" uses an automatic (DHCP) address again."
}

case "${1:-}" in
  install) install ;;
  uninstall) uninstall ;;
  status) status ;;
  restart) launchctl kickstart -k "$DOMAIN/$LABEL" && sleep 2 && status ;;
  logs) touch "$LOG" && tail -n 50 -f "$LOG" ;;
  pin-ip) pin_ip ;;
  unpin-ip) unpin_ip ;;
  *) sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
