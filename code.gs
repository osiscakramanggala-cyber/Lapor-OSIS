// ============================================
// LAPOR! OSIS - Google Apps Script Backend
// ============================================

// KONFIGURASI
const SHEET_NAME = 'Laporan';
const N8N_WEBHOOK_URL = ''; // Isi dengan URL webhook n8n Anda (opsional)

// Function untuk handle GET requests
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getLaporan') {
    return getLaporan(e.parameter.id);
  } else if (action === 'getAllLaporan') {
    return getAllLaporan();
  } else if (action === 'getStatistik') {
    return getStatistik();
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'Invalid action'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Function untuk handle POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'createLaporan') {
      return createLaporan(data.data);
    } else if (action === 'updateLaporan') {
      return updateLaporan(data.data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Generate ID Laporan unik
function generateLaporanId() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return 'LAP-2025-0001';
  }
  
  const lastId = sheet.getRange(lastRow, 1).getValue();
  const lastNumber = parseInt(lastId.split('-')[2]);
  const newNumber = (lastNumber + 1).toString().padStart(4, '0');
  
  return `LAP-2025-${newNumber}`;
}

// Buat Laporan Baru
function createLaporan(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const id = generateLaporanId();
    const timestamp = new Date();
    
    // Data untuk spreadsheet
    const rowData = [
      id,
      data.nama || 'Anonim',
      data.kelas || '-',
      data.jenisLaporan || 'Aspirasi',
      data.tujuan || '-',
      data.isiLaporan || '',
      data.bukti || '',
      Utilities.formatDate(timestamp, 'Asia/Jakarta', 'dd/MM/yyyy HH:mm'),
      'Menunggu',
      '',
      data.nomorWa || '',
      Utilities.formatDate(timestamp, 'Asia/Jakarta', 'dd/MM/yyyy HH:mm')
    ];
    
    // Append ke sheet
    sheet.appendRow(rowData);
    
    // Kirim webhook ke n8n (jika ada)
    if (N8N_WEBHOOK_URL) {
      sendWebhook({
        event: 'laporan_baru',
        id_laporan: id,
        nama: data.nama || 'Anonim',
        jenis_laporan: data.jenisLaporan,
        tujuan: data.tujuan,
        status: 'Menunggu',
        nomor_wa: data.nomorWa
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Laporan berhasil dikirim',
      data: {
        id: id,
        tanggal: Utilities.formatDate(timestamp, 'Asia/Jakarta', 'dd/MM/yyyy')
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get Laporan by ID
function getLaporan(id) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === id) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          data: {
            id: data[i][0],
            nama: data[i][1],
            kelas: data[i][2],
            jenisLaporan: data[i][3],
            tujuan: data[i][4],
            isiLaporan: data[i][5],
            bukti: data[i][6],
            tanggal: data[i][7],
            status: data[i][8],
            tanggapan: data[i][9],
            nomorWa: data[i][10],
            waktuUpdate: data[i][11]
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Laporan tidak ditemukan'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get All Laporan (untuk Admin)
function getAllLaporan() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const laporan = [];
    
    for (let i = 1; i < data.length; i++) {
      laporan.push({
        id: data[i][0],
        nama: data[i][1],
        kelas: data[i][2],
        jenisLaporan: data[i][3],
        tujuan: data[i][4],
        isiLaporan: data[i][5],
        bukti: data[i][6],
        tanggal: data[i][7],
        status: data[i][8],
        tanggapan: data[i][9],
        nomorWa: data[i][10],
        waktuUpdate: data[i][11]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: laporan.reverse() // Terbaru di atas
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Update Laporan (untuk Admin)
function updateLaporan(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const allData = sheet.getDataRange().getValues();
    const timestamp = new Date();
    
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][0] === data.id) {
        // Update status (kolom I, index 8)
        if (data.status) {
          sheet.getRange(i + 1, 9).setValue(data.status);
        }
        
        // Update tanggapan (kolom J, index 9)
        if (data.tanggapan !== undefined) {
          sheet.getRange(i + 1, 10).setValue(data.tanggapan);
        }
        
        // Update waktu update (kolom L, index 11)
        sheet.getRange(i + 1, 12).setValue(
          Utilities.formatDate(timestamp, 'Asia/Jakarta', 'dd/MM/yyyy HH:mm')
        );
        
        // Kirim webhook ke n8n (jika ada)
        if (N8N_WEBHOOK_URL && data.status) {
          sendWebhook({
            event: 'status_updated',
            id_laporan: data.id,
            status: data.status,
            tanggapan: data.tanggapan || '',
            nomor_wa: allData[i][10]
          });
        }
        
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'Laporan berhasil diupdate'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Laporan tidak ditemukan'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get Statistik
function getStatistik() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    let total = data.length - 1; // minus header
    let menunggu = 0;
    let diproses = 0;
    let selesai = 0;
    
    const jenisCount = {};
    const tujuanCount = {};
    
    for (let i = 1; i < data.length; i++) {
      const status = data[i][8];
      const jenis = data[i][3];
      const tujuan = data[i][4];
      
      // Count status
      if (status === 'Menunggu') menunggu++;
      else if (status === 'Diproses') diproses++;
      else if (status === 'Selesai') selesai++;
      
      // Count jenis
      jenisCount[jenis] = (jenisCount[jenis] || 0) + 1;
      
      // Count tujuan
      tujuanCount[tujuan] = (tujuanCount[tujuan] || 0) + 1;
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: {
        total,
        menunggu,
        diproses,
        selesai,
        byJenis: jenisCount,
        byTujuan: tujuanCount
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Send Webhook to n8n
function sendWebhook(payload) {
  if (!N8N_WEBHOOK_URL) return;
  
  try {
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    UrlFetchApp.fetch(N8N_WEBHOOK_URL, options);
  } catch (error) {
    Logger.log('Webhook error: ' + error.toString());
  }
}