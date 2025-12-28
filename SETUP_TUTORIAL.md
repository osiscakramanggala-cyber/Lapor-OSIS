# 🛠️ CARA SETUP GOOGLE SHEETS DAN APPS SCRIPT

## Langkah 1: Buat Google Spreadsheet

1. Buka Google Drive (drive.google.com)
2. Klik "New" → "Google Sheets" → "Blank spreadsheet"
3. Beri nama: **LAPOR! OSIS Database**

## Langkah 2: Buat Struktur Tabel

1. Pada sheet pertama, ganti nama sheet menjadi **Laporan** (klik kanan pada tab sheet di bawah)
2. Di baris pertama (header), masukkan kolom-kolom berikut:

```
A1: ID Laporan
B1: Nama
C1: Kelas
D1: Jenis Laporan
E1: Tujuan
F1: Isi Laporan
G1: Bukti
H1: Tanggal
I1: Status
J1: Tanggapan
K1: Nomor WhatsApp
L1: Waktu Update
```

**Screenshot struktur:**
```
| ID Laporan | Nama | Kelas | Jenis Laporan | Tujuan | Isi Laporan | Bukti | Tanggal | Status | Tanggapan | Nomor WhatsApp | Waktu Update |
|------------|------|-------|---------------|--------|-------------|-------|---------|--------|-----------|----------------|---------------|
```

## Langkah 3: Buka Apps Script Editor

1. Di Google Sheets, klik menu **Extensions** → **Apps Script**
2. Jendela baru akan terbuka (Google Apps Script Editor)
3. Hapus semua kode default yang ada di file `Code.gs`

## Langkah 4: Copy-Paste Kode Apps Script

1. Buka file `code.gs` di root project ini
2. Copy **SEMUA** kode dari file tersebut
3. Paste ke Apps Script Editor
4. (Opsional) Jika ingin menggunakan webhook n8n, ubah baris:
   ```javascript
   const N8N_WEBHOOK_URL = ''; // Ganti dengan URL webhook n8n Anda
   ```
5. Klik icon disket atau tekan `Ctrl+S` untuk save
6. Beri nama project: **LAPOR OSIS API**

## Langkah 5: Deploy sebagai Web App

1. Klik tombol **Deploy** (di kanan atas) → **New deployment**
2. Klik icon ⚙️ (gear/roda gigi) di samping "Select type"
3. Pilih **Web app**
4. Isi form deployment:
   - **Description**: `LAPOR! OSIS API v1`
   - **Execute as**: `Me (email@gmail.com)` ← Pilih akun Anda
   - **Who has access**: `Anyone` ← **PENTING! Harus "Anyone"**
5. Klik **Deploy**

## Langkah 6: Authorize Access

1. Setelah klik Deploy, akan muncul popup **"Authorization required"**
2. Klik **Authorize access**
3. Pilih akun Google Anda
4. Akan muncul warning "Google hasn't verified this app"
5. Klik **Advanced** → **Go to [Project Name] (unsafe)**
6. Review permissions dan klik **Allow**

## Langkah 7: Copy Web App URL

Setelah deployment berhasil, akan muncul dialog dengan **Web app URL**:

```
https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

**COPY URL INI!** 📋

## Langkah 8: Update .env di React App

1. Buka file `/app/frontend/.env`
2. Cari baris `REACT_APP_GOOGLE_SCRIPT_URL=`
3. Paste URL yang kamu copy tadi:

```env
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxXXXXXXXXX/exec
```

4. Save file
5. Restart React app:

```bash
cd /app/frontend
yarn start
```

## Langkah 9: Testing

### Test 1: Kirim Laporan Baru

1. Buka website LAPOR! OSIS
2. Klik "Aspirasiku" atau "Laporanku"
3. Isi form dan klik "Kirim"
4. Kamu akan dapat kode laporan (misal: `LAP-2025-0001`)
5. **Cek Google Sheets** → Harusnya data sudah masuk!

### Test 2: Cek Status Laporan

1. Klik menu "Cek Laporan"
2. Masukkan kode laporan yang kamu dapat
3. Klik "Cek"
4. Data laporan akan muncul!

### Test 3: Admin Dashboard

1. Klik "Admin" di navbar
2. Login dengan:
   - Username: `adminosis`
   - Password: `lapor123`
3. Kamu akan lihat semua laporan di dashboard
4. Coba update status atau tambahkan tanggapan
5. Klik "Simpan"
6. **Cek Google Sheets** → Data harusnya ter-update!

## ⚠️ Troubleshooting

### Error: "Script function not found: doPost"

**Solusi:**
- Pastikan kode di Apps Script sudah di-save
- Re-deploy web app (Deploy → Manage deployments → Edit → Version: New version → Deploy)

### Error: "Authorization required"

**Solusi:**
- Apps Script belum di-authorize
- Ulangi Langkah 6 untuk authorize access

### Error: "Exception: Service invoked too many times"

**Solusi:**
- Google Apps Script punya quota limit
- Tunggu beberapa menit
- Quota akan reset otomatis

### Data tidak masuk ke spreadsheet

**Solusi:**
1. Cek nama sheet apakah **"Laporan"** (case-sensitive!)
2. Cek struktur kolom sudah benar
3. Cek Web App deployment setting: "Who has access" = "Anyone"
4. View logs: Apps Script Editor → View → Logs (atau tekan `Ctrl+Enter`)

### CORS Error di browser console

**Solusi:**
- Google Apps Script secara otomatis handle CORS
- Pastikan fetch() menggunakan `redirect: 'follow'` (sudah ada di code)

## 📝 Tips:

1. **Backup spreadsheet** secara berkala (File → Make a copy)
2. **Jangan ubah nama sheet** "Laporan" (akan break integration)
3. **Jangan ubah urutan kolom** (akan break integration)
4. **Test dulu di mode development** sebelum production
5. **Monitor quota usage**: Apps Script → Project settings → Quotas

## 🔐 Security Best Practices:

1. **Jangan share spreadsheet URL** ke publik
2. **Set spreadsheet permissions** hanya untuk admin OSIS
3. **Gunakan OAuth** untuk production app (advanced)
4. **Rotate credentials** secara berkala
5. **Monitor logs** untuk aktivitas mencurigakan

## 🚀 Next Steps:

1. Setup webhook n8n untuk WhatsApp notification (opsional)
2. Customize UI sesuai branding sekolah
3. Deploy React app ke Netlify/GitHub Pages
4. Setup custom domain
5. Training admin OSIS cara pakai dashboard

---

**Sudah setup semua?** 🎉

Selamat! Website LAPOR! OSIS kamu sudah siap digunakan!

**Butuh bantuan?**
- Baca dokumentasi lengkap di `README.md`
- Check Google Apps Script logs untuk debugging