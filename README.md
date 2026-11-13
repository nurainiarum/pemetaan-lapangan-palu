# 📍 Sistem Informasi Pemetaan Fasilitas Lapangan Olahraga Kota Palu

![CI Status](https://github.com/nurainiarum/pemetaan-lapangan-palu/actions/workflows/ci.yml/badge.svg)

> **Tugas Rekayasa Perangkat Lunak (RPL) — Kelas TI C**  
> **Program Studi S1 Teknik Informatika, Fakultas Teknik, Universitas Tadulako**  
> **Kelompok 8:**  
> 1. Nur'aini Asmaningrum (F5512520081) — *Penyusun Workflow & Dokumentasi*  
> 2. Muh. Agil Fahreza (F5512530116) — *Penguji (Tester) & Skenario Gagal*  
> 3. Dimas Maulana Yusuf (F5512520085) — *Koordinator & Reviewer Proyek*  

---

## 📖 Deskripsi Proyek
Aplikasi berbasis web untuk memetakan dan menyajikan informasi detail persebaran fasilitas lapangan olahraga (futsal, sepak bola, basket, badminton, voli) di wilayah Kota Palu secara interaktif.

---

## 🛠️ Cara Menjalankan di Lokal

### 1. Prasyarat
- Node.js versi 18 atau 20+

### 2. Menjalankan Server
```bash
npm start
# atau: node server.js
```
Akses di browser: `http://localhost:3000/api/lapangan`

### 3. Menjalankan Pengujian Otomatis
```bash
npm test
```

---

## ⚙️ Penjelasan Pipeline CI (`.github/workflows/ci.yml`)

Workflow CI dijalankan secara otomatis pada GitHub Actions untuk memastikan integritas dan kualitas kode sebelum diintegrasikan:
1. **Trigger:** Aktif saat ada `push` atau `pull_request` ke cabang `main`.
2. **Runner:** `ubuntu-latest` dengan `actions/setup-node@v4` (Node.js 20 LTS).
3. **Automated Test:** Menjalankan `npm test` yang mengeksekusi 5 skenario uji validasi skema data, batas koordinat geografis Kota Palu, dan aturan validasi data fasilitas.
