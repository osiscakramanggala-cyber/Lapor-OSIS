# LAPOR! OSIS - Layanan Aspirasi dan Pengaduan Online Remaja

Sistem aduan dan aspirasi untuk OSIS sekolah berbasis React dan Google Sheets, dengan UI/UX modern dan profesional.

## 🎯 Fitur Utama

### Untuk Siswa:
- **Aspirasiku**: Kirim kritik & saran untuk organisasi/ekstrakurikuler atau pihak sekolah
- **Laporanku**: Laporkan kasus bullying atau pelanggaran siswa
- **Cek Laporan**: Pantau status laporan dengan kode unik
- **Statistik**: Lihat data dan grafik laporan yang masuk
- **Anonim**: Opsi mengirim laporan tanpa identitas

### Untuk Admin OSIS:
- **Dashboard**: Kelola semua laporan dalam satu tempat
- **Update Status**: Ubah status laporan (Menunggu → Diproses → Selesai)
- **Tanggapan**: Berikan feedback untuk setiap laporan
- **Filter & Search**: Cari dan filter laporan dengan mudah
- **Real-time Stats**: Lihat statistik laporan secara real-time

## 🚀 Quick Start

### 1. Setup Google Apps Script

Ikuti panduan lengkap di file `GOOGLE_APPS_SCRIPT_SETUP.md`:

1. Buat Google Spreadsheet baru
2. Copy kode dari `code.gs` ke Apps Script Editor
3. Deploy sebagai Web App
4. Copy URL Web App

### 2. Konfigurasi Environment

Buat file `.env.local` di folder `/app/frontend/`:

```env
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Install & Run

```bash
# Install dependencies
cd /app/frontend
yarn install

# Run development server
yarn start
```

### 4. Build untuk Production

```bash
yarn build
```

Hasil build akan ada di folder `build/` dan siap di-deploy ke Netlify, GitHub Pages, atau hosting lainnya.

## 🔐 Login Admin

**Default Credentials:**
- Username: `adminosis`
- Password: `lapor123`

> **Catatan**: Untuk production, ganti dengan sistem autentikasi yang lebih aman.

## 🎨 Design System

### Color Palette:
- Primary: Soft Green (#a5d6a7, #81c784)
- Secondary: White & Light Gray
- Accent: Blue, Red, Purple, Yellow (untuk status)

### Typography:
- Font Family: Poppins
- Weights: 300, 400, 500, 600, 700

### Components:
- Card-based layout
- Soft shadows
- Rounded corners
- Hover animations
- Responsive design

## 📱 Tech Stack

- **Frontend**: React 19
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + Custom CSS
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Toast**: Sonner
- **Backend**: Google Apps Script + Google Sheets
- **Database**: Google Spreadsheet

## 📂 Project Structure

```
/app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Aspirasi.jsx
│   │   │   ├── Laporan.jsx
│   │   │   ├── CekLaporan.jsx
│   │   │   ├── Statistik.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── utils/
│   │   │   └── googleSheets.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── code.gs (Google Apps Script)
└── GOOGLE_APPS_SCRIPT_SETUP.md
```

## 🔌 Webhook n8n (Opsional)

Untuk integrasi WhatsApp otomatis:

1. Setup n8n workflow
2. Buat webhook endpoint
3. Update `N8N_WEBHOOK_URL` di `code.gs`
4. Re-deploy Google Apps Script

**Webhook akan mengirim:**
- Notifikasi saat laporan baru masuk
- Update status ke WhatsApp pelapor

## 📊 Database Schema (Google Sheets)

| Kolom | Deskripsi |
|-------|----------|
| ID Laporan | Format: LAP-YYYY-XXXX |
| Nama | Nama pelapor (atau Anonim) |
| Kelas | Kelas siswa |
| Jenis Laporan | Aspirasi, Bullying, Pelanggaran |
| Tujuan | Organisasi/Pihak Sekolah |
| Isi Laporan | Detail laporan |
| Bukti | Link Google Drive |
| Tanggal | Tanggal dibuat |
| Status | Menunggu, Diproses, Selesai |
| Tanggapan | Respon dari admin |
| Nomor WhatsApp | Untuk notifikasi (opsional) |
| Waktu Update | Timestamp terakhir update |

## 🛡️ Security Notes

- Laporan anonim dijaga kerahasiaannya
- Admin login menggunakan localStorage (untuk demo)
- Google Apps Script di-deploy dengan akses "Anyone" untuk API publik
- Untuk production, tambahkan API key atau OAuth

## 📝 To-Do / Enhancement Ideas

- [ ] Implementasi JWT authentication untuk admin
- [ ] Email notification untuk admin
- [ ] Export laporan ke PDF/Excel
- [ ] Dashboard analytics lebih detail
- [ ] Multi-role admin (Super Admin, Moderator)
- [ ] Notifikasi push web
- [ ] Dark mode
- [ ] PWA support

## 🤝 Contributing

Silakan fork dan buat pull request untuk improvement!

## 📄 License

MIT License - Free to use untuk sekolah dan organisasi non-profit.

## 👥 Credits

Dibuat dengan ❤️ untuk siswa-siswi Indonesia

---

**LAPOR! OSIS** - Suaramu, Perubahan untuk Sekolah Kita