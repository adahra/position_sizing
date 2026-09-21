# position_sizing

Kalkulator trading sederhana berbasis browser untuk membantu menghitung ukuran posisi dan rencana exit berdasarkan batas risiko.

## Fitur

- Menghitung nominal risiko maksimum berdasarkan total modal dan pilihan risiko 1% atau 3%.
- Menghitung jarak Stop-Loss (SL) menggunakan `2 x ATR`, dibulatkan ke atas ke Rupiah penuh.
- Menghitung titik SL dan Take-Profit (TP) berdasarkan harga beli.
- Mendukung rasio risk-reward 1:2 dan 1:3.
- Menghitung lot maksimum dengan asumsi satu lot terdiri dari 100 saham.
- Memvalidasi agar modal, harga beli, dan ATR harus berupa angka yang lebih besar dari nol.

## Cara menjalankan

Repositori ini adalah aplikasi HTML statis dan tidak membutuhkan dependency, backend, atau environment variable.

1. Clone repositori:

   ```bash
   git clone https://github.com/adahra/position_sizing.git
   cd position_sizing
   ```

2. Buka `index.html` langsung di browser, atau jalankan server HTTP lokal:

   ```bash
   python3 -m http.server 8000
   ```

3. Buka `http://localhost:8000/` di browser.

## Struktur file

- `index.html` — struktur halaman dan form input.
- `styles.css` — tampilan aplikasi.
- `script.js` — validasi input dan logika perhitungan posisi, SL, serta TP.

## Rumus utama

- Nilai risiko maksimum = modal × persentase risiko
- Jarak SL = `ceil(ATR × 2)`
- Titik SL = harga beli − jarak SL
- Jarak TP = jarak SL × rasio risk-reward
- Titik TP = harga beli + jarak TP
- Lot maksimum = `floor(nilai risiko maksimum ÷ (jarak SL × 100))`
