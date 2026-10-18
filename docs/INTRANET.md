# Menjalankan Human Atlas di Intranet

Panduan ini untuk menjalankan Human Atlas di jaringan lokal (lab komputer, Wi-Fi sekolah, kantor) tanpa internet.

## Cara kerjanya

- **Server hanya melayani file statis.** Tidak ada database, API, atau proses berat di server. `scripts/serve.mjs` adalah server Node.js tanpa dependensi npm.
- **Setiap perangkat menyimpan model 3D sendiri.** Model anatomi (±33 MB) diunduh **sekali** per perangkat lalu disimpan di IndexedDB browser. Kunjungan berikutnya tidak mengunduh geometri lagi; yang dikirim server hanya pemeriksaan singkat (`304 Not Modified`).
- **Cache diperbarui otomatis bila perlu.** Saat build, setiap file model diberi hash isi. Perangkat mengunduh ulang hanya jika model benar-benar berubah, dan versi lama dihapus otomatis sehingga ruang penyimpanan tidak terus bertambah.
- **Kode aplikasi di-cache permanen.** File JS/CSS memakai nama ber-hash. Pada pembaruan aplikasi, perangkat hanya mengunduh bagian yang berubah (three.js dan library lain biasanya tetap di cache).

Perkiraan lalu lintas jaringan:

| | Per perangkat |
|---|---|
| Kunjungan pertama | ±33,5 MB (model 33 MB + aplikasi ±0,5 MB terkompresi) |
| Kunjungan berikutnya | beberapa KB (hanya pemeriksaan `304`) |

Contoh: 30 perangkat yang dibuka bersamaan untuk pertama kali membutuhkan ±1 GB. Pada Wi-Fi ±200 Mbit/s itu sekitar 40–60 detik. Setelah itu, membuka ulang di kelas hampir tidak memakai bandwidth.

## Langkah pemasangan

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

3. **Jalankan** di server (Node.js 22 atau lebih baru):

   ```sh
   node serve.mjs
   ```

   Server menampilkan alamat yang bisa dibuka perangkat lain, misalnya `http://192.168.1.10:3016`.
   Dari dalam repositori, cukup `npm start`.

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

## HTTPS (opsional)

Lewat HTTP biasa semua fitur di atas tetap bekerja. Jika server memakai HTTPS (misalnya sertifikat CA internal), browser juga bisa menandai penyimpanan sebagai *persistent*, sehingga cache tidak dihapus saat ruang disk menipis. Aplikasi memintanya otomatis bila tersedia.

## Pemecahan masalah

| Gejala | Penyebab / solusi |
|---|---|
| `Port 3016 is already in use` | Jalankan dengan port lain: `PORT=8080 node serve.mjs` |
| Perangkat lain tidak bisa membuka alamat | Periksa firewall server dan pastikan perangkat berada di jaringan yang sama |
| "This browser could not start the 3D viewer" | WebGL dimatikan atau driver grafis terlalu lama; gunakan Chrome/Edge/Firefox versi terbaru |
| "The 3D session was paused by your device" | Memori GPU habis (perangkat lemah atau terlalu banyak tab). Tutup tab lain lalu muat ulang |
