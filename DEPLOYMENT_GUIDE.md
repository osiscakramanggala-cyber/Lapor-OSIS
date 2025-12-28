# 🚀 Panduan Deploy LAPOR! OSIS

## Cara Build untuk Production

### 1. Build React App

```bash
cd /app/frontend
yarn build
```

Hasil build akan ada di folder `/app/frontend/build/`

### 2. File yang Dihasilkan

```
build/
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── manifest.json
└── ...
```

---

## 🌐 Deploy ke Netlify

### Cara 1: Drag & Drop (Paling Mudah)

1. Buka [netlify.com](https://www.netlify.com/)
2. Login/Sign up
3. Klik "Sites" → "Add new site" → "Deploy manually"
4. Drag & drop folder `build/` ke area upload
5. Tunggu proses upload selesai
6. Website kamu sudah live! 🎉

### Cara 2: Via Git (Otomatis)

1. Push code ke GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/lapor-osis.git
git push -u origin main
```

2. Di Netlify:
   - Klik "Add new site" → "Import an existing project"
   - Pilih "GitHub" dan authorize
   - Pilih repository kamu
   - Build settings:
     - Base directory: `frontend`
     - Build command: `yarn build`
     - Publish directory: `frontend/build`
   - Klik "Deploy site"

3. Environment Variables:
   - Site settings → Environment variables
   - Add: `REACT_APP_GOOGLE_SCRIPT_URL` = URL Google Apps Script kamu

---

## 🐙 Deploy ke GitHub Pages

### 1. Install gh-pages

```bash
cd /app/frontend
yarn add --dev gh-pages
```

### 2. Update package.json

Tambahkan di `package.json`:

```json
{
  "homepage": "https://username.github.io/lapor-osis",
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  }
}
```

Ganti `username` dan `lapor-osis` sesuai GitHub kamu.

### 3. Deploy

```bash
yarn deploy
```

Website akan live di `https://username.github.io/lapor-osis`

### 4. Setup Environment Variables

Karena GitHub Pages tidak support environment variables, ada 2 opsi:

**Opsi A: Hardcode URL (Tidak Recommended)**

Di `frontend/.env.production`:
```env
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

**Opsi B: Build Sebelum Deploy**

1. Set env variable sebelum build:
```bash
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/... yarn build
```

---

## ☁️ Deploy ke Vercel

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Deploy

```bash
cd /app/frontend
vercel
```

Ikuti prompt:
- Set up and deploy? **Yes**
- Which scope? **Pilih account kamu**
- Link to existing project? **No**
- What's your project's name? **lapor-osis**
- In which directory is your code located? **.**
- Want to override settings? **Yes**
  - Build Command: `yarn build`
  - Output Directory: `build`
  - Development Command: `yarn start`

### 3. Environment Variables

```bash
vercel env add REACT_APP_GOOGLE_SCRIPT_URL
```

Paste URL Google Apps Script kamu.

### 4. Deploy Production

```bash
vercel --prod
```

---

## 🔧 Custom Domain

### Netlify

1. Site settings → Domain management
2. Add custom domain
3. Update DNS records di domain provider:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### GitHub Pages

1. Repository → Settings → Pages
2. Custom domain: `yourdomain.com`
3. Update DNS:
   ```
   Type: CNAME
   Name: www
   Value: username.github.io
   ```

---

## ⚙️ Environment Variables yang Dibutuhkan

```env
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

**Pastikan URL sudah diupdate sebelum deploy!**

---

## ✅ Checklist Before Deploy

- [ ] Google Apps Script sudah di-deploy
- [ ] Web App URL sudah dicopy
- [ ] `.env` atau environment variables sudah diupdate
- [ ] Website sudah ditest di localhost
- [ ] Semua form berfungsi dengan baik
- [ ] Build production berhasil (`yarn build`)
- [ ] No console errors di browser

---

## 🐛 Troubleshooting

### Build gagal

```bash
# Clear cache dan reinstall
rm -rf node_modules
rm yarn.lock
yarn install
yarn build
```

### API tidak connect setelah deploy

- Cek environment variables sudah benar
- Pastikan Google Apps Script deployment setting: "Anyone" can access
- Test API URL langsung di browser

### Blank page setelah deploy

- Cek browser console untuk error
- Pastikan `homepage` di package.json benar (untuk GitHub Pages)
- Clear cache browser dan reload

---

## 📊 Performance Tips

### 1. Enable Compression

Di Netlify, compression otomatis enabled.

### 2. CDN

Netlify dan Vercel otomatis pakai CDN global.

### 3. Caching

Build production sudah include hashing untuk optimal caching.

---

## 🔒 Security Checklist

- [ ] Google Spreadsheet hanya accessible oleh admin
- [ ] Apps Script deployed dengan "Anyone" untuk API (sudah aman)
- [ ] Admin credentials sudah diganti dari default
- [ ] HTTPS enabled (otomatis di Netlify/Vercel)
- [ ] CORS sudah di-handle di Apps Script

---

## 📱 PWA (Progressive Web App)

React app ini sudah include service worker. Untuk enable PWA:

1. Edit `frontend/src/index.js`:
```javascript
serviceWorkerRegistration.register(); // Ganti dari unregister()
```

2. Rebuild dan deploy

Website bisa di-install sebagai app di mobile!

---

## 🎉 Done!

Website LAPOR! OSIS kamu sudah live dan siap digunakan!

**Next Steps:**
1. Share link ke siswa-siswi
2. Training admin OSIS
3. Monitor laporan yang masuk
4. Kumpulkan feedback untuk improvement

---

**Need Help?**
- Check logs di platform hosting
- Review Google Apps Script logs
- Test API endpoint langsung
