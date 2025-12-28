# Setup Google Apps Script untuk LAPOR! OSIS

## 1. Buat Google Spreadsheet Baru

1. Buka Google Drive → Klik "New" → Google Sheets
2. Beri nama: **LAPOR! OSIS Database**
3. Buat sheet dengan nama: **Laporan**

## 2. Struktur Kolom Spreadsheet

Pada sheet **Laporan**, buat header di baris pertama dengan kolom berikut:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ID Laporan | Nama | Kelas | Jenis Laporan | Tujuan | Isi Laporan | Bukti | Tanggal | Status | Tanggapan | Nomor WhatsApp | Waktu Update |

**Contoh data:**
```
LAP-2025-0001 | Anonim | 11 IPA 1 | Aspirasi | OSIS | Saran untuk kegiatan... | https://... | 21/10/2025 | Menunggu | - | 628123456789 | 21/10/2025 10:00
```

## 3. Buka Apps Script Editor

1. Di spreadsheet, klik **Extensions** → **Apps Script**
2. Hapus semua kode default
3. Copy-paste kode dari file `code.gs` yang sudah disediakan
4. Klik **Save** (icon disket atau Ctrl+S)

## 4. Deploy sebagai Web App

1. Klik **Deploy** → **New deployment**
2. Klik icon ⚙️ (gear) di sebelah "Select type"
3. Pilih **Web app**
4. Setting:
   - **Description:** LAPOR! OSIS API
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Klik **Deploy**
6. Copy **Web app URL** yang muncul
   - Contoh: `https://script.google.com/macros/s/AKfycbx.../exec`

## 5. Testing API

### Test POST (Kirim Laporan Baru)
```bash
curl -X POST \
  'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec' \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "createLaporan",
    "data": {
      "nama": "Test User",
      "kelas": "11 IPA 1",
      "jenisLaporan": "Aspirasi",
      "tujuan": "OSIS",
      "isiLaporan": "Test laporan",
      "bukti": "",
      "nomorWa": "628123456789"
    }
  }'
```

### Test GET (Cek Status Laporan)
```bash
curl 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getLaporan&id=LAP-2025-0001'
```

### Test GET (Semua Laporan untuk Admin)
```bash
curl 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getAllLaporan'
```

## 6. Update Web App URL di React App

Setelah mendapatkan Web App URL, update file di React:

1. Buat file `/app/frontend/.env.local` (atau edit `.env`)
2. Tambahkan:
```env
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## 7. Update Webhook n8n (Opsional)

Di file `code.gs`, cari baris:
```javascript
const N8N_WEBHOOK_URL = '';
```

Ganti dengan URL webhook n8n Anda:
```javascript
const N8N_WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/lapor-osis';
```

## Troubleshooting

### Error: "Exception: Service invoked too many times in a short time"
- Google Apps Script memiliki quota. Tunggu beberapa menit.

### Error: "Authorization required"
- Pastikan "Who has access" diset ke **Anyone**
- Re-deploy web app

### Data tidak muncul di spreadsheet
- Periksa nama sheet apakah **Laporan** (case-sensitive)
- Cek console log di Apps Script (View → Logs)

## Fitur Google Apps Script

✅ Auto-generate ID Laporan (LAP-YYYY-XXXX)
✅ Timestamp otomatis
✅ Webhook ke n8n (optional)
✅ CORS enabled untuk React app
✅ Support GET & POST requests
✅ Admin dashboard data (getAllLaporan)
✅ Update status & tanggapan admin