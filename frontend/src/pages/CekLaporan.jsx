import React, { useState } from 'react';
import { Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { googleSheetsAPI } from '../utils/googleSheets';
import { toast } from 'sonner';

const CekLaporan = () => {
  const [kodeLaporan, setKodeLaporan] = useState('');
  const [loading, setLoading] = useState(false);
  const [laporan, setLaporan] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleCekLaporan = async (e) => {
    e.preventDefault();
    
    if (!kodeLaporan.trim()) {
      toast.error('Masukkan kode laporan');
      return;
    }

    setLoading(true);
    setNotFound(false);
    setLaporan(null);
    
    try {
      const result = await googleSheetsAPI.getLaporan(kodeLaporan.trim());

      if (result.status === 'success') {
        setLaporan(result.data);
        toast.success('Laporan ditemukan!');
      } else {
        setNotFound(true);
        toast.error('Laporan tidak ditemukan');
      }
    } catch (error) {
      setNotFound(true);
      toast.error('Gagal mengecek laporan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Diproses':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Selesai':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Menunggu':
        return <Clock className="w-5 h-5" />;
      case 'Diproses':
        return <AlertCircle className="w-5 h-5" />;
      case 'Selesai':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8" data-testid="cek-laporan-header">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Cek Laporan</h1>
          <p className="text-gray-600">
            Masukkan kode laporan untuk mengecek status
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleCekLaporan} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6" data-testid="search-form">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kode Laporan</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  data-testid="input-kode-laporan"
                  value={kodeLaporan}
                  onChange={(e) => setKodeLaporan(e.target.value.toUpperCase())}
                  placeholder="LAP-2025-0001"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  data-testid="button-cek"
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <span>Mencari...</span>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Cek</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Contoh format: LAP-2025-0001
              </p>
            </div>
          </div>
        </form>

        {/* Result - Laporan Ditemukan */}
        {laporan && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fadeIn" data-testid="laporan-result">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold text-gray-800">Detail Laporan</h2>
                <div className={`px-4 py-2 rounded-full border-2 flex items-center space-x-2 ${getStatusColor(laporan.status)}`} data-testid="status-badge">
                  {getStatusIcon(laporan.status)}
                  <span className="font-semibold">{laporan.status}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Kode: <span className="font-mono font-semibold text-gray-700">{laporan.id}</span></p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nama Pelapor</p>
                  <p className="font-medium text-gray-800" data-testid="laporan-nama">{laporan.nama}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Kelas</p>
                  <p className="font-medium text-gray-800" data-testid="laporan-kelas">{laporan.kelas}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jenis Laporan</p>
                  <p className="font-medium text-gray-800" data-testid="laporan-jenis">{laporan.jenisLaporan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tujuan</p>
                  <p className="font-medium text-gray-800" data-testid="laporan-tujuan">{laporan.tujuan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tanggal Dibuat</p>
                  <p className="font-medium text-gray-800" data-testid="laporan-tanggal">{laporan.tanggal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Terakhir Update</p>
                  <p className="font-medium text-gray-800" data-testid="laporan-update">{laporan.waktuUpdate || laporan.tanggal}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Isi Laporan</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200" data-testid="laporan-isi">
                  <p className="text-gray-700 whitespace-pre-wrap">{laporan.isiLaporan}</p>
                </div>
              </div>

              {laporan.bukti && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Bukti Pendukung</p>
                  <a
                    href={laporan.bukti}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="laporan-bukti"
                    className="text-purple-600 hover:text-purple-800 underline break-all"
                  >
                    {laporan.bukti}
                  </a>
                </div>
              )}

              {laporan.tanggapan && laporan.tanggapan !== '' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Tanggapan OSIS</p>
                  <p className="text-gray-700" data-testid="laporan-tanggapan">{laporan.tanggapan}</p>
                </div>
              )}

              {laporan.status === 'Menunggu' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    Laporan kamu sedang dalam antrian. Tim OSIS akan segera meninjau dan menindaklanjuti.
                  </p>
                </div>
              )}

              {laporan.status === 'Diproses' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Laporan kamu sedang dalam proses penanganan oleh tim OSIS.
                  </p>
                </div>
              )}

              {laporan.status === 'Selesai' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    Laporan kamu telah selesai ditangani. Terima kasih atas partisipasimu!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Result - Not Found */}
        {notFound && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center" data-testid="not-found-message">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Laporan Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-6">
              Kode laporan tidak ditemukan. Pastikan kode yang kamu masukkan benar.
            </p>
            <button
              onClick={() => {
                setKodeLaporan('');
                setNotFound(false);
              }}
              data-testid="button-coba-lagi"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Info */}
        {!laporan && !notFound && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6" data-testid="info-box">
            <h3 className="font-semibold text-purple-900 mb-2">Cara Cek Laporan:</h3>
            <ol className="text-sm text-purple-800 space-y-1 list-decimal list-inside">
              <li>Masukkan kode laporan yang kamu terima saat mengirim aspirasi/laporan</li>
              <li>Klik tombol "Cek" untuk melihat status terkini</li>
              <li>Kamu akan melihat detail laporan dan tanggapan dari OSIS (jika ada)</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default CekLaporan;