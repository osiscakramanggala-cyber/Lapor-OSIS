# 📖 User Guide - LAPOR! OSIS

Panduan lengkap menggunakan website LAPOR! OSIS untuk siswa dan admin.

---

## 👨‍🎓 Panduan untuk Siswa

### 1. Mengirim Aspirasi

**Aspirasi** adalah kritik dan saran untuk organisasi, ekstrakurikuler, atau pihak sekolah.

#### Langkah-langkah:

1. **Buka halaman Aspirasiku**
   - Klik menu "Aspirasiku" di navbar
   - Atau klik tombol "Kirim Aspirasi" di homepage

2. **Isi Form Aspirasi**
   
   **Identitas (Opsional):**
   - Nama: Kosongkan jika ingin anonim
   - Kelas: Contoh: 11 IPA 1
   
   **Kategori Tujuan (Wajib):**
   - Pilih "Organisasi & Ekskul" atau "Pihak Sekolah"
   
   **Tujuan (Wajib):**
   - Pilih tujuan dari dropdown
   - Organisasi: OSIS, MPK, Paskibra, PMR, dll
   - Pihak Sekolah: Kepala Sekolah, Waka Kesiswaan, dll
   
   **Judul Aspirasi (Wajib):**
   - Berikan judul yang jelas
   - Contoh: "Usulan kegiatan bakti sosial"
   
   **Isi Aspirasi (Wajib):**
   - Jelaskan kritik/saran secara detail
   - Berikan alasan dan usulan solusi
   
   **Bukti Pendukung (Opsional):**
   - Upload foto/dokumen ke Google Drive
   - Copy link dan paste di form
   
   **Nomor WhatsApp (Opsional):**
   - Format: 628xxxxxxxxxx
   - Untuk menerima notifikasi status

3. **Kirim dan Simpan Kode**
   - Klik tombol "Kirim Aspirasi"
   - Kamu akan dapat **kode laporan** (contoh: LAP-2025-0001)
   - **SIMPAN KODE INI!** Untuk cek status nanti

#### Tips:
- ✅ Sampaikan dengan sopan dan konstruktif
- ✅ Berikan data/fakta yang jelas
- ✅ Usulkan solusi, bukan hanya keluhan
- ❌ Jangan gunakan kata-kata kasar
- ❌ Jangan kirim laporan spam

---

### 2. Mengirim Laporan (Bullying/Pelanggaran)

**Laporan** untuk kasus bullying atau pelanggaran siswa yang serius.

#### Langkah-langkah:

1. **Buka halaman Laporanku**
   - Klik menu "Laporanku" di navbar
   - Atau klik tombol "Buat Laporan" di homepage

2. **Isi Form Laporan**
   
   **Identitas (Opsional):**
   - Boleh anonim untuk keamanan
   
   **Jenis Laporan (Wajib):**
   - Pilih "Bullying" atau "Pelanggaran Siswa"
   
   **Nama Terlapor (Opsional):**
   - Isi jika kamu tahu siapa pelakunya
   
   **Kronologi Kejadian (Wajib):**
   - Jelaskan detail: Apa, Kapan, Di mana, Siapa
   - Contoh:
     ```
     Pada hari Senin, 15 Januari 2025, pukul 10.00 di kantin,
     saya melihat siswa X melakukan bullying verbal kepada
     siswa Y dengan mengatakan...
     ```
   
   **Bukti (Opsional tapi sangat membantu):**
   - Screenshot chat, foto, video
   - Upload ke Google Drive dan paste link

3. **Laporan Dijaga Kerahasiaannya**
   - Identitas pelapor tidak akan dibocorkan
   - OSIS akan menindaklanjuti dengan bijak
   - Jika bahaya mendesak, hubungi guru BK langsung

#### Kapan Harus Lapor:
- 🚨 Bullying fisik atau verbal berulang
- 🚨 Ancaman atau intimidasi
- 🚨 Pelanggaran serius (narkoba, kekerasan)
- 🚨 Diskriminasi atau pelecehan

---

### 3. Cek Status Laporan

Pantau perkembangan laporan kamu dengan kode unik.

#### Langkah-langkah:

1. **Buka halaman Cek Laporan**
   - Klik menu "Cek Laporan" di navbar

2. **Masukkan Kode Laporan**
   - Ketik kode yang kamu terima saat mengirim
   - Format: LAP-2025-0001

3. **Lihat Detail**
   - **Status Menunggu** 🟡: Laporan dalam antrian
   - **Status Diproses** 🔵: OSIS sedang menangani
   - **Status Selesai** 🟢: Sudah ditindaklanjuti
   
   - Kamu juga bisa lihat **tanggapan OSIS** jika ada

#### Tips:
- Cek status secara berkala
- Simpan kode laporan dengan aman
- Jika urgent dan belum ada respon, hubungi OSIS langsung

---

### 4. Lihat Statistik

Lihat data transparan tentang laporan di sekolah.

#### Cara Akses:
- Klik menu "Statistik" di navbar

#### Apa yang Bisa Dilihat:
- 📊 Total laporan yang masuk
- 📈 Grafik status laporan (Menunggu, Diproses, Selesai)
- 🥧 Diagram jenis laporan (Aspirasi, Bullying, Pelanggaran)
- 📋 Distribusi laporan per organisasi/tujuan

#### Manfaat:
- Transparansi kerja OSIS
- Lihat tren masalah di sekolah
- Evaluasi kinerja penanganan

---

## 👨‍💼 Panduan untuk Admin OSIS

### 1. Login Admin Dashboard

#### Langkah-langkah:

1. **Akses halaman Admin**
   - Klik tombol "Admin" di navbar (hijau)
   - Atau buka `/admin` di browser

2. **Login**
   - **Username**: `adminosis`
   - **Password**: `lapor123`
   - Klik "Login"

#### Security:
- 🔒 Jangan share kredensial admin
- 🔒 Logout setelah selesai
- 🔒 Ganti password default untuk production

---

### 2. Dashboard Admin

Setelah login, kamu akan masuk ke dashboard dengan fitur lengkap.

#### Overview:

**Statistik Cards:**
- Total Laporan
- Laporan Menunggu (perlu ditindaklanjuti)
- Laporan Diproses
- Laporan Selesai

**Filter & Search:**
- Filter berdasarkan status
- Search by ID, nama, jenis, atau tujuan

**Tabel Laporan:**
- Semua laporan ditampilkan dalam tabel
- Informasi: ID, Nama, Jenis, Tujuan, Tanggal, Status

---

### 3. Menangani Laporan

#### Melihat Detail:

1. Klik tombol **"Lihat"** pada laporan yang ingin ditangani
2. Modal detail akan muncul dengan info lengkap:
   - Identitas pelapor
   - Isi laporan
   - Bukti (jika ada)
   - Status saat ini

#### Update Status:

**3 Status yang tersedia:**

1. **Menunggu** 🟡
   - Laporan baru masuk
   - Belum ditinjau

2. **Diproses** 🔵
   - Laporan sedang ditangani
   - Investigasi/koordinasi berlangsung
   - Update ini ke pelapor agar mereka tahu

3. **Selesai** 🟢
   - Masalah sudah diselesaikan
   - Tindakan sudah diambil
   - Berikan tanggapan akhir

#### Berikan Tanggapan:

1. Di modal detail, scroll ke bawah
2. Di kolom **"Tanggapan"**, tulis respon untuk pelapor:
   
   **Contoh tanggapan:**
   ```
   Terima kasih atas aspirasimu. Kami telah meninjau usulan
   kegiatan bakti sosial dan akan diagendakan untuk bulan
   depan. Tim OSIS akan menghubungi kamu untuk koordinasi
   lebih lanjut.
   ```

3. Pilih status yang sesuai
4. Klik **"Simpan"**

#### Tips Menangani Laporan:

**Aspirasi:**
- ✅ Respon dalam 1-3 hari
- ✅ Apresiasi input dari siswa
- ✅ Jelaskan jika tidak bisa direalisasi (dengan alasan)
- ✅ Update perkembangan jika usulan diterima

**Bullying:**
- 🚨 **PRIORITAS TINGGI**
- 🚨 Tangani dalam 24 jam
- 🚨 Koordinasi dengan guru BK
- 🚨 Jaga kerahasiaan pelapor
- 🚨 Ambil tindakan tegas sesuai tata tertib

**Pelanggaran:**
- ⚠️ Verifikasi fakta dulu
- ⚠️ Dengar kedua belah pihak
- ⚠️ Koordinasi dengan waka kesiswaan
- ⚠️ Tegakkan tata tertib sekolah

---

### 4. Workflow Penanganan Laporan

```
Laporan Masuk
    ↓
Review & Validasi (1-2 hari)
    ↓
Update Status: "Diproses"
Berikan tanggapan awal
    ↓
Tindak Lanjut:
- Koordinasi tim
- Investigasi jika perlu
- Ambil keputusan/tindakan
    ↓
Update Status: "Selesai"
Berikan tanggapan akhir
    ↓
Dokumentasi & Evaluasi
```

---

### 5. Best Practices untuk Admin

#### Response Time:
- Aspirasi: Maksimal 3 hari kerja
- Bullying: **Maksimal 24 jam**
- Pelanggaran: 1-2 hari

#### Komunikasi:
- ✅ Profesional dan sopan
- ✅ Jelas dan transparan
- ✅ Empati terhadap pelapor
- ✅ Jaga privasi

#### Koordinasi:
- Libatkan guru BK untuk kasus sensitif
- Konsultasi dengan pembina OSIS
- Koordinasi antar divisi OSIS
- Dokumentasi semua tindakan

#### Evaluasi Berkala:
- Review laporan setiap minggu
- Identifikasi pola/tren masalah
- Laporkan ke pembina OSIS
- Buat program preventif

---

## 🔔 Notifikasi WhatsApp (Opsional)

Jika webhook n8n sudah disetup, pelapor akan dapat notifikasi otomatis:

**Saat laporan diterima:**
```
Halo! Laporan kamu telah kami terima dengan kode LAP-2025-0001.
Tim OSIS akan segera meninjau. Terima kasih!
```

**Saat status berubah:**
```
Update: Status laporan LAP-2025-0001 kini DIPROSES.
Kami sedang menangani laporanmu.
```

```
Update: Laporan LAP-2025-0001 telah SELESAI ditangani.
Terima kasih atas partisipasimu!
```

---

## ❓ FAQ (Pertanyaan Umum)

### Untuk Siswa:

**Q: Apakah identitas saya benar-benar anonim?**
A: Ya! Jika kamu tidak mengisi nama dan kelas, laporan akan tercatat sebagai "Anonim" dan dijaga kerahasiaannya.

**Q: Berapa lama laporan saya diproses?**
A: Aspirasi biasanya 1-3 hari. Laporan bullying diprioritaskan dan ditangani dalam 24 jam.

**Q: Bagaimana jika lupa kode laporan?**
A: Sayangnya kode tidak bisa di-recover. Pastikan simpan kode saat mengirim laporan.

**Q: Bisa kirim laporan lebih dari 1?**
A: Tentu! Tidak ada batasan. Setiap laporan akan dapat kode unik.

**Q: Laporan saya tidak ada tanggapan, kenapa?**
A: Cek status di menu "Cek Laporan". Jika masih "Menunggu" lebih dari 3 hari, hubungi OSIS langsung.

### Untuk Admin:

**Q: Bagaimana cara logout?**
A: Klik tombol "Logout" dengan icon merah di navbar.

**Q: Bisa hapus laporan?**
A: Tidak bisa dari dashboard. Edit langsung di Google Spreadsheet jika perlu.

**Q: Bagaimana cara backup data?**
A: Google Spreadsheet otomatis tersimpan di Google Drive. Bisa export ke Excel jika perlu.

**Q: Laporan terlalu banyak, bagaimana prioritas?**
A: Gunakan filter status. Prioritaskan "Menunggu", lalu fokus ke Bullying dulu.

---

## 🆘 Bantuan Darurat

Jika kamu dalam bahaya segera atau butuh bantuan mendesak:

1. **Hubungi langsung:**
   - Guru BK
   - Waka Kesiswaan
   - Orang tua
   - Polisi: 110

2. **Jangan tunggu respon online** untuk situasi darurat!

3. **LAPOR! OSIS** untuk dokumentasi dan follow-up formal.

---

## 📞 Kontak

**OSIS SMA Negeri X**
- Email: osis@sekolah.sch.id
- WhatsApp: 0812-3456-7890
- Instagram: @osis_sman_x

**Jam Operasional:**
Senin - Jumat: 07.00 - 15.00

---

**Ingat:**
"Suaramu penting untuk perubahan yang lebih baik!" 💚

---

**Versi:** 1.0
**Terakhir diupdate:** Oktober 2025
