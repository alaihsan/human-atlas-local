# Menjalankan Human Atlas di Intranet

Panduan ini untuk menjalankan Human Atlas di jaringan lokal (lab komputer, Wi-Fi sekolah, kantor) tanpa internet.

## Cara kerjanya

- **Server hanya melayani file statis.** Tidak ada database, API, atau proses berat di server. `scripts/serve.mjs` adalah server Node.js tanpa dependensi npm.
- **Setiap perangkat menyimpan model 3D sendiri.** Model anatomi (±33 MB) diunduh **sekali** per perangkat lalu disimpan di IndexedDB browser. Kunjungan berikutnya tidak mengunduh geometri lagi; yang dikirim server hanya pemeriksaan singkat (`304 Not Modified`).
- **Cache diperbarui otomatis bila perlu.** Saat build, setiap file model diberi hash isi. Perangkat mengunduh ulang hanya jika model benar-benar berubah, dan versi lama dihapus otomatis sehingga ruang penyimpanan tidak terus bertambah.
- **Kode aplikasi di-cache permanen.** File JS/CSS memakai nama ber-hash. Pada pembaruan aplikasi, perangkat hanya mengunduh bagian yang berubah (three.js dan library lain biasanya tetap di cache).
- **Bisa dibuka walau server mati (lewat HTTPS).** Service worker menyimpan kerangka aplikasi (±3 MB) di perangkat. Bersama model di IndexedDB, perangkat yang pernah membuka aplikasi tetap bisa memakainya saat server mati. Browser hanya menjalankan service worker lewat HTTPS atau `localhost`; lihat [Mode offline penuh](#mode-offline-penuh-service-worker--https).

Perkiraan lalu lintas jaringan:

| | Per perangkat |
|---|---|
| Kunjungan pertama | ±33,5 MB (model 33 MB + aplikasi ±0,5 MB terkompresi) |
| Kunjungan berikutnya | beberapa KB (hanya pemeriksaan `304`) |

Contoh: 30 perangkat yang dibuka bersamaan untuk pertama kali membutuhkan ±1 GB. Pada Wi-Fi ±200 Mbit/s itu sekitar 40–60 detik. Setelah itu, membuka ulang di kelas hampir tidak memakai bandwidth.

## Cara cepat: jalankan langsung dari repositori

Jika komputer yang menyimpan repositori ini sekaligus menjadi server:

```sh
npm ci           # sekali saja, atau setelah package.json berubah
npm run build    # setiap kali kode atau model berubah
npm start        # sama dengan: node scripts/serve.mjs
```

Di dalam repositori, file server ada di `scripts/serve.mjs`, bukan di root. Karena itu `node serve.mjs` dari root repositori akan gagal dengan `Cannot find module`.

## Menjalankan terus di Mac (tanpa terminal terbuka)

`npm start` berhenti saat terminal ditutup. Agar server berjalan di latar belakang, ikut menyala setiap kali Anda login, dan otomatis hidup lagi bila berhenti, pasang sebagai layanan macOS (launchd):

```sh
npm run build                                # sekali, sebelum memasang
bash scripts/macos-service.sh install        # pasang dan jalankan sekarang
```

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `bash scripts/macos-service.sh status` | Cek apakah berjalan, dan tampilkan alamat untuk perangkat lain |
| `bash scripts/macos-service.sh logs` | Lihat log server |
| `bash scripts/macos-service.sh restart` | Muat ulang server (hanya perlu bila `scripts/serve.mjs` berubah) |
| `bash scripts/macos-service.sh uninstall` | Hentikan dan hapus layanan |

- Setelah `npm run build` berikutnya, layanan **tidak perlu** di-restart; file baru langsung dilayani.
- Selama layanan berjalan, Mac dicegah tidur otomatis (`caffeinate`). Layar tetap boleh mati. Namun MacBook yang **ditutup** tetap tidur, kecuali tersambung ke monitor eksternal dan charger.
- Layanan berjalan selama Anda login. Untuk server yang menyala tanpa login, aktifkan login otomatis di Pengaturan Sistem → Pengguna & Grup.
- Jangan simpan repositori di Desktop, Documents, atau Downloads; macOS dapat memblokir layanan latar belakang membaca folder itu. `~/dev` aman.
- Jika firewall macOS aktif, skrip menampilkan perintah sekali jalan untuk mengizinkan Node.js menerima koneksi.
- Jika Node.js diperbarui lewat nvm (path-nya berubah), jalankan `install` sekali lagi.

## Alamat yang tetap

IP dari router (DHCP) bisa berganti, misalnya setelah Mac restart. Ada tiga cara agar perangkat lain selalu menemukan server, dari yang paling mudah:

> Pilih **satu** alamat lalu pakai terus di setiap perangkat. Browser menyimpan cache per alamat, jadi perangkat yang berpindah dari alamat IP ke alamat `.local` (atau sebaliknya) akan mengunduh model 33 MB lagi.

1. **Pakai nama `.local`, tanpa pengaturan apa pun.** `status` menampilkan alamat seperti `http://nama-mac.local:3016`. Nama ini tetap walau IP berganti, dan bisa dibuka di iPhone/iPad, Mac, Windows 10/11, dan Linux. Sebagian perangkat Android tidak mendukung `.local`, jadi gunakan IP untuk perangkat itu.
2. **Reservasi DHCP di router (paling kuat).** Di halaman admin router, kunci IP Mac ini ke alamat MAC-nya. `pin-ip` di bawah menampilkan alamat MAC tersebut. Untuk Wi-Fi, matikan "Private Wi-Fi Address" (atau setel ke *Fixed*) pada jaringan itu agar alamat MAC tidak berganti.
3. **Kunci IP dari Mac:**

   ```sh
   bash scripts/macos-service.sh pin-ip     # memakai IP saat ini secara permanen (meminta password)
   bash scripts/macos-service.sh unpin-ip   # kembali ke otomatis
   ```

   Router, DNS, dan subnet tetap diambil otomatis; hanya IP yang dikunci. Jika MacBook juga dipakai di jaringan lain (misalnya Wi-Fi rumah), jalankan `unpin-ip` di sana. IP yang dikunci bisa tidak cocok dengan jaringan lain itu.

## Langkah pemasangan di server terpisah

1. **Build** di komputer yang punya internet (Node.js 22.13 atau lebih baru):

   ```sh
   npm ci
   npm run build
   ```

2. **Salin** ke server intranet hanya dua hal ini (server tidak perlu `npm install`):

   ```
   human-atlas/
   ├── serve.mjs   ← dari scripts/serve.mjs
   └── dist/       ← hasil build
   ```

3. **Jalankan** di server (Node.js 22 atau lebih baru), dari dalam folder `human-atlas/` tadi:

   ```sh
   cd human-atlas
   node serve.mjs
   ```

   Server menampilkan alamat yang bisa dibuka perangkat lain, misalnya `http://192.168.1.10:3016`.

   Pengaturan lewat variabel lingkungan: `PORT` (bawaan `3016`), `HOST` (bawaan `0.0.0.0`), `ATLAS_DIST` (lokasi folder `dist`).

4. **Buka port di firewall** server (TCP 3016, atau port yang Anda pilih).

5. **Panaskan perangkat sebelum kelas (disarankan).** Buka aplikasi sekali di setiap perangkat sampai model selesai dimuat. Saat kelas dimulai, semua perangkat sudah memuat dari penyimpanan lokal.

> Jangan pakai `npm run dev` untuk melayani pengguna. Mode dev mengirim ratusan file tanpa kompresi, memantau file dengan polling (boros CPU), dan membuka endpoint pengembang.

### Menjalankan otomatis saat server menyala (Linux, systemd)

`/etc/systemd/system/human-atlas.service`:

```ini
[Unit]
Description=Human Atlas
After=network.target

[Service]
WorkingDirectory=/srv/human-atlas
ExecStart=/usr/bin/node /srv/human-atlas/serve.mjs
Environment=PORT=3016
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```sh
sudo systemctl enable --now human-atlas
```

Di Windows, jalankan `node serve.mjs` lewat Task Scheduler dengan pemicu "At startup".

### Alternatif: nginx

Jika sudah ada nginx, layani folder `dist/` langsung:

```nginx
server {
    listen 80;
    root /srv/human-atlas/dist;
    gzip_static on;                      # memakai file .gz yang dibuat saat build

    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    location / {
        add_header Cache-Control "no-cache";
        try_files $uri $uri/ =404;       # file yang tidak ada harus 404, bukan index.html
    }
}
```

Biarkan file `*.bin.gz` dikirim apa adanya (`application/octet-stream`, tanpa `Content-Encoding`), seperti konfigurasi bawaan nginx. Dengan begitu perangkat menyimpan versi terkompresinya (33 MB, bukan 62 MB).

## Penyimpanan di perangkat

- Lokasi: IndexedDB browser, database `human-atlas`. Ukuran ±33 MB per perangkat per browser.
- Jendela private/incognito tidak menyimpan cache secara permanen; perangkat akan mengunduh ulang setiap sesi.
- Untuk menghapus: Pengaturan browser → Privasi → Data situs → hapus data untuk alamat server.
- Jika penyimpanan perangkat penuh, aplikasi tetap berjalan dan memuat model dari server.
- Unduhan yang terputus (Wi-Fi tidak stabil, server sibuk) dicoba ulang otomatis hingga 3 kali. Setiap file diperiksa ukurannya sebelum disimpan, jadi data rusak tidak pernah masuk cache.

## Mode offline penuh: service worker + HTTPS

Service worker sudah ada di aplikasi dan aktif sendiri, tetapi **browser hanya menjalankannya lewat HTTPS atau `localhost`**. Lewat `http://192.168.x.x` browser memblokirnya. Dalam kondisi itu aplikasi tetap berjalan normal dan model tetap disimpan di IndexedDB; yang tidak tersedia hanyalah kemampuan membuka aplikasi saat server mati.

Dengan HTTPS, Anda mendapat:

- Aplikasi tetap terbuka di perangkat yang pernah memakainya, walau server mati atau Mac tidur.
- Server yang lambat tidak membuat perangkat menunggu lama: setelah 4 detik, versi tersimpan yang dipakai.
- Penyimpanan ditandai *persistent*, jadi browser tidak menghapus cache saat ruang disk menipis.
- Pembaruan tetap otomatis. Setelah `npm run build`, perangkat mengambil versi baru saat aplikasi dibuka berikutnya, lalu menghapus versi lama.

Cara memasang HTTPS di jaringan lokal dengan [mkcert](https://github.com/FiloSottile/mkcert) (sekali, di Mac server):

```sh
brew install mkcert
mkcert -install
mkdir -p ~/.human-atlas
mkcert -cert-file ~/.human-atlas/cert.pem -key-file ~/.human-atlas/key.pem \
  "$(scutil --get LocalHostName).local" 192.168.1.50 localhost   # ganti dengan IP Mac Anda
TLS_CERT=~/.human-atlas/cert.pem TLS_KEY=~/.human-atlas/key.pem bash scripts/macos-service.sh install
```

Setelah itu setiap perangkat harus **memercayai sertifikat induk** mkcert. Lokasinya ditampilkan oleh `mkcert -CAROOT`, file `rootCA.pem`. Bagikan hanya `rootCA.pem`; jangan pernah bagikan `rootCA-key.pem`.

| Perangkat | Cara memasang `rootCA.pem` |
|---|---|
| iPhone/iPad | Kirim lewat AirDrop → Pengaturan → Profil Diunduh → Instal. Lalu Umum → Mengenai → Pengaturan Kepercayaan Sertifikat → aktifkan |
| Android | Pengaturan → Keamanan → Enkripsi & kredensial → Instal sertifikat → Sertifikat CA |
| Windows | Klik dua kali → Instal Sertifikat → Local Machine → *Trusted Root Certification Authorities* |
| Chromebook | Setelan → Privasi dan keamanan → Keamanan → Kelola sertifikat → Otoritas → Impor |

Sertifikat berlaku untuk nama `.local` dan IP yang Anda tulis saat membuatnya. Jika IP Mac berganti, buat ulang sertifikat atau gunakan alamat `.local`. Ini alasan lain untuk [mengunci alamat](#alamat-yang-tetap).

Tanpa server Mac, `TLS_CERT` dan `TLS_KEY` juga bisa dipakai langsung: `TLS_CERT=cert.pem TLS_KEY=key.pem node serve.mjs`.

## Pemecahan masalah

| Gejala | Penyebab / solusi |
|---|---|
| `Port 3016 is already in use` | Server lain (atau layanan macOS) sudah memakai port itu. Cek `bash scripts/macos-service.sh status`, atau pakai port lain: `PORT=8080 npm start` |
| Layanan macOS terpasang tetapi tidak menjawab | Lihat `bash scripts/macos-service.sh logs`. Penyebab umum: belum `npm run build`, atau repositori ada di Desktop/Documents/Downloads |
| Kadang tidak bisa diakses | Mac tidur (MacBook ditutup) atau IP berganti; lihat [Alamat yang tetap](#alamat-yang-tetap) |
| Perangkat lain tidak bisa membuka alamat | Periksa firewall server dan pastikan perangkat berada di jaringan yang sama |
| "This browser could not start the 3D viewer" | WebGL dimatikan atau driver grafis terlalu lama; gunakan Chrome/Edge/Firefox versi terbaru |
| "The 3D session was paused by your device" | Memori GPU habis (perangkat lemah atau terlalu banyak tab). Tutup tab lain lalu muat ulang |
