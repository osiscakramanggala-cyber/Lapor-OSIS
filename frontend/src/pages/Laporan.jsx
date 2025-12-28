import React, { useState } from 'react';
import { FileText, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { googleSheetsAPI } from '../utils/googleSheets';
import { toast } from 'sonner';

const Laporan = () => {
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    jenisLaporan: 'Bullying',
    namaTerlapor: '',
    isiLaporan: '',
    bukti: '',
    nomorWa: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [laporanId, setLaporanId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.isiLaporan) {
      toast.error('Mohon jelaskan kronologi kejadian');
      return;
    }

    setLoading(true);
    
    try {
      const result = await googleSheetsAPI.createLaporan({
        nama: formData.nama || 'Anonim',
        kelas: formData.kelas || '-',
        jenisLaporan: formData.jenisLaporan,
        tujuan: 'OSIS - Laporan',
        isiLaporan: `Jenis: ${formData.jenisLaporan}\nTerlapor: ${formData.namaTerlapor || 'Tidak disebutkan'}\n\nKronologi:\n${formData.isiLaporan}`,
        bukti: formData.bukti,
        nomorWa: formData.nomorWa
      });

      if (result.status === 'success') {
        setLaporanId(result.data.id);
        setSuccess(true);
        toast.success('Laporan berhasil dikirim!');
      } else {
        toast.error(result.message || 'Terjadi kesalahan');
      }
    } catch (error) {
      toast.error('Gagal mengirim laporan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nama: '',
      kelas: '',
      jenisLaporan: 'Bullying',
      namaTerlapor: '',
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Laporan Diterima</h2>
            <p className="text-gray-600 mb-6">
              Laporan kamu telah kami terima. Kami akan menindaklanjuti dengan serius dan menjaga kerahasiaanmu.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Kode Laporan:</p>
              <p className="text-2xl font-bold text-red-700" data-testid="laporan-id">{laporanId}</p>
              <p className="text-sm text-gray-500 mt-2">
                Simpan kode ini untuk mengecek status laporanmu di menu <strong>Cek Laporan</strong>
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800 text-left">
                  Jika kamu merasa dalam bahaya segera, hubungi guru BK atau pihak sekolah langsung.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                data-testid="button-kirim-lagi"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Kirim Laporan Lagi
              </button>
              <a
                href="/cek-laporan"
                data-testid="button-cek-status"
                className="px-6 py-3 bg-white text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
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
        <div className="text-center mb-8" data-testid="laporan-header">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-xl mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Laporanku</h1>
          <p className="text-gray-600">
            Laporkan kasus bullying atau pelanggaran siswa dengan aman
          </p>
        </div>

        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6" data-testid="warning-box">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-1">Informasi Penting</p>
              <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                <li>Laporanmu akan dijaga kerahasiaannya</li>
                <li>OSIS akan menindaklanjuti dengan bijak</li>
                <li>Jangan ragu untuk melaporkan jika kamu merasa tidak aman</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8" data-testid="laporan-form">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Jenis Laporan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Laporan <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  data-testid="jenis-bullying"
                  onClick={() => setFormData({...formData, jenisLaporan: 'Bullying'})}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.jenisLaporan === 'Bullying'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bullying
                </button>
                <button
                  type="button"
                  data-testid="jenis-pelanggaran"
                  onClick={() => setFormData({...formData, jenisLaporan: 'Pelanggaran Siswa'})}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.jenisLaporan === 'Pelanggaran Siswa'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pelanggaran Siswa
                </button>
              </div>
            </div>

            {/* Nama Terlapor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Terlapor (Opsional)</label>
              <input
                type="text"
                data-testid="input-terlapor"
                value={formData.namaTerlapor}
                onChange={(e) => setFormData({...formData, namaTerlapor: e.target.value})}
                placeholder="Nama siswa yang dilaporkan (jika diketahui)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Kronologi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kronologi Kejadian <span className="text-red-500">*</span></label>
              <textarea
                data-testid="textarea-kronologi"
                value={formData.isiLaporan}
                onChange={(e) => setFormData({...formData, isiLaporan: e.target.value})}
                required
                rows="8"
                placeholder="Jelaskan secara detail apa yang terjadi, kapan, di mana, dan siapa saja yang terlibat..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
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
                placeholder="Link Google Drive untuk foto, video, atau chat screenshot"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Upload bukti ke Google Drive dan paste link-nya di sini</p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Untuk menerima notifikasi update status (opsional)</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="button-submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Mengirim...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Kirim Laporan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Laporan;