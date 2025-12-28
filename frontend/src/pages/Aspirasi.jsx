import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, Upload, X } from 'lucide-react';
import { googleSheetsAPI } from '../utils/googleSheets';
import { toast } from 'sonner';

const Aspirasi = () => {
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    kategori: 'organisasi',
    tujuan: '',
    judul: '',
    isiLaporan: '',
    bukti: '',
    nomorWa: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [laporanId, setLaporanId] = useState('');

  const organisasiList = [
    'OSIS', 'MPK', 'Paskibra', 'Pramuka', 'PMR', 'Literasi Genius', 
    'BSC', 'English Club', 'Kelompok Ilmiah Remaja', 'Futsal', 
    'Bandung Karate Club', 'Basket', 'Volly', 'IRMA', 'Superseiya'
  ];

  const sekolahList = [
    'Kepala Sekolah', 'Waka Kesiswaan', 'Waka Kurikulum', 
    'Waka Humas', 'Waka Sarpras', 'Staf Tata Usaha'
  ];

  const tujuanList = formData.kategori === 'organisasi' ? organisasiList : sekolahList;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.isiLaporan || !formData.tujuan) {
      toast.error('Mohon lengkapi form yang wajib diisi');
      return;
    }

    setLoading(true);
    
    try {
      const result = await googleSheetsAPI.createLaporan({
        nama: formData.nama || 'Anonim',
        kelas: formData.kelas || '-',
        jenisLaporan: 'Aspirasi',
        tujuan: formData.tujuan,
        isiLaporan: `${formData.judul}\n\n${formData.isiLaporan}`,
        bukti: formData.bukti,
        nomorWa: formData.nomorWa
      });

      if (result.status === 'success') {
        setLaporanId(result.data.id);
        setSuccess(true);
        toast.success('Aspirasi berhasil dikirim!');
      } else {
        toast.error(result.message || 'Terjadi kesalahan');
      }
    } catch (error) {
      toast.error('Gagal mengirim aspirasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nama: '',
      kelas: '',
      kategori: 'organisasi',
      tujuan: '',
      judul: '',
      isiLaporan: '',
      bukti: '',
      nomorWa: ''
    });
    setSuccess(false);
    setLaporanId('');
  };

  if (success) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto" data-testid="success-message">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Terima Kasih!</h2>
            <p className="text-gray-600 mb-6">
              Aspirasi kamu telah kami terima dan akan segera ditindaklanjuti oleh tim OSIS.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Kode Laporan:</p>
              <p className="text-2xl font-bold text-green-700" data-testid="laporan-id">{laporanId}</p>
              <p className="text-sm text-gray-500 mt-2">
                Simpan kode ini untuk mengecek status laporanmu di menu <strong>Cek Laporan</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                data-testid="button-kirim-lagi"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Kirim Aspirasi Lagi
              </button>
              <a
                href="/cek-laporan"
                data-testid="button-cek-status"
                className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
              >
                Cek Status Laporan
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8" data-testid="aspirasi-header">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Aspirasiku</h1>
          <p className="text-gray-600">
            Sampaikan kritik dan saran untuk organisasi, ekstrakurikuler, atau sekolah
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8" data-testid="aspirasi-form">
          <div className="space-y-6">
            {/* Identitas (Opsional) */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-semibold mb-1">Identitas (Opsional)</p>
              <p className="text-xs text-blue-600">Kosongkan jika ingin mengirim secara anonim</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  data-testid="input-nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  placeholder="Nama kamu (opsional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                <input
                  type="text"
                  data-testid="input-kelas"
                  value={formData.kelas}
                  onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                  placeholder="Contoh: 11 IPA 1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Tujuan <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  data-testid="kategori-organisasi"
                  onClick={() => setFormData({...formData, kategori: 'organisasi', tujuan: ''})}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.kategori === 'organisasi'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Organisasi & Ekskul
                </button>
                <button
                  type="button"
                  data-testid="kategori-sekolah"
                  onClick={() => setFormData({...formData, kategori: 'sekolah', tujuan: ''})}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.kategori === 'sekolah'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pihak Sekolah
                </button>
              </div>
            </div>

            {/* Tujuan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tujuan <span className="text-red-500">*</span></label>
              <select
                data-testid="select-tujuan"
                value={formData.tujuan}
                onChange={(e) => setFormData({...formData, tujuan: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Pilih tujuan...</option>
                {tujuanList.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Aspirasi <span className="text-red-500">*</span></label>
              <input
                type="text"
                data-testid="input-judul"
                value={formData.judul}
                onChange={(e) => setFormData({...formData, judul: e.target.value})}
                required
                placeholder="Contoh: Usulan kegiatan bakti sosial"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Isi Aspirasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Isi Aspirasi <span className="text-red-500">*</span></label>
              <textarea
                data-testid="textarea-isi"
                value={formData.isiLaporan}
                onChange={(e) => setFormData({...formData, isiLaporan: e.target.value})}
                required
                rows="6"
                placeholder="Jelaskan kritik, saran, atau usulan kamu secara detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Bukti */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bukti Pendukung (Opsional)</label>
              <input
                type="text"
                data-testid="input-bukti"
                value={formData.bukti}
                onChange={(e) => setFormData({...formData, bukti: e.target.value})}
                placeholder="Link Google Drive, foto, atau dokumen pendukung"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Upload file ke Google Drive dan paste link-nya di sini</p>
            </div>

            {/* Nomor WA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp (Opsional)</label>
              <input
                type="text"
                data-testid="input-wa"
                value={formData.nomorWa}
                onChange={(e) => setFormData({...formData, nomorWa: e.target.value})}
                placeholder="628xxxxxxxxxx"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Untuk menerima notifikasi update status (opsional)</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="button-submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Mengirim...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Kirim Aspirasi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Aspirasi;