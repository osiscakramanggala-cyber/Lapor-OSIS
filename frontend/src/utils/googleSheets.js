// Google Sheets API Helper
// Ganti dengan URL Google Apps Script Anda
const GOOGLE_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL || '';

export const googleSheetsAPI = {
  // Kirim Laporan Baru
  createLaporan: async (data) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'createLaporan',
          data: data
        }),
        redirect: 'follow'
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating laporan:', error);
      throw error;
    }
  },

  // Get Laporan by ID
  getLaporan: async (id) => {
    try {
      const response = await fetch(
        `${GOOGLE_SCRIPT_URL}?action=getLaporan&id=${id}`
      );
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error getting laporan:', error);
      throw error;
    }
  },

  // Get All Laporan (Admin)
  getAllLaporan: async () => {
    try {
      const response = await fetch(
        `${GOOGLE_SCRIPT_URL}?action=getAllLaporan`
      );
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error getting all laporan:', error);
      throw error;
    }
  },

  // Update Laporan (Admin)
  updateLaporan: async (data) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateLaporan',
          data: data
        }),
        redirect: 'follow'
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating laporan:', error);
      throw error;
    }
  },

  // Get Statistik
  getStatistik: async () => {
    try {
      const response = await fetch(
        `${GOOGLE_SCRIPT_URL}?action=getStatistik`
      );
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error getting statistik:', error);
      throw error;
    }
  }
};