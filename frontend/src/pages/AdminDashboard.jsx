import React, { useState, useEffect } from 'react';
import { RefreshCw, Eye, Save, Filter, Search } from 'lucide-react';
import { googleSheetsAPI } from '../utils/googleSheets';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filter, setFilter] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [updateData, setUpdateData] = useState({
    id: '',
    status: '',
    tanggapan: ''
  });

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    setLoading(true);
    try {
      const result = await googleSheetsAPI.getAllLaporan();
      
      if (result.status === 'success') {
        setLaporan(result.data);
        toast.success('Data berhasil dimuat');
      } else {
        toast.error('Gagal memuat data');
      }
    } catch (error) {
      toast.error('Gagal memuat data laporan');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (item) => {
    setSelectedLaporan(item);
    setUpdateData({
      id: item.id,
      status: item.status,
      tanggapan: item.tanggapan || ''
    });
    setShowDetail(true);
  };

  const handleUpdateLaporan = async () => {
    try {
      const result = await googleSheetsAPI.updateLaporan(updateData);
      
      if (result.status === 'success') {
        toast.success('Laporan berhasil diupdate');
        setShowDetail(false);
        fetchLaporan(); // Refresh data
      } else {
        toast.error(result.message || 'Gagal update laporan');
      }
    } catch (error) {
      toast.error('Gagal update laporan');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-yellow-100 text-yellow-800';
      case 'Diproses':
        return 'bg-blue-100 text-blue-800';
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLaporan = laporan.filter((item) => {
    const matchStatus = filter === 'Semua' || item.status === filter;
    const matchSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenisLaporan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tujuan.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchStatus && matchSearch;
  });

  const stats = {
    total: laporan.length,
    menunggu: laporan.filter(l => l.status === 'Menunggu').length,
    diproses: laporan.filter(l => l.status === 'Diproses').length,
    selesai: laporan.filter(l => l.status === 'Selesai').length,
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8" data-testid="admin-dashboard-header">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
              <p className="text-gray-600">Kelola dan pantau semua laporan</p>
            </div>
            <button
              onClick={fetchLaporan}
              data-testid="button-refresh"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-testid="admin-stats">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 mb-1">Total Laporan</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 mb-1">Menunggu</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.menunggu}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 mb-1">Diproses</p>
              <p className="text-2xl font-bold text-blue-600">{stats.diproses}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 mb-1">Selesai</p>
              <p className="text-2xl font-bold text-green-600">{stats.selesai}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6" data-testid="filters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                Filter Status
              </label>
              <select
                data-testid="filter-status"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Semua">Semua Status</option>
                <option value="Menunggu">Menunggu</option>
                <option value="Diproses">Diproses</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline w-4 h-4 mr-1" />
                Cari Laporan
              </label>
              <input
                type="text"
                data-testid="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari ID, nama, jenis, atau tujuan..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden" data-testid="laporan-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jenis</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tujuan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredLaporan.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      Tidak ada laporan
                    </td>
                  </tr>
                ) : (
                  filteredLaporan.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50" data-testid={`row-${item.id}`}>
                      <td className="px-4 py-3 text-sm font-mono text-gray-800">{item.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.nama}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.jenisLaporan}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.tujuan}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.tanggal}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleViewDetail(item)}
                          data-testid={`button-view-${item.id}`}
                          className="text-green-600 hover:text-green-800 font-semibold text-sm flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Lihat</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {showDetail && selectedLaporan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-testid="detail-modal">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Detail Laporan</h2>
              <p className="text-sm text-gray-500">ID: {selectedLaporan.id}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nama</p>
                  <p className="font-medium text-gray-800">{selectedLaporan.nama}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kelas</p>
                  <p className="font-medium text-gray-800">{selectedLaporan.kelas}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jenis</p>
                  <p className="font-medium text-gray-800">{selectedLaporan.jenisLaporan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tujuan</p>
                  <p className="font-medium text-gray-800">{selectedLaporan.tujuan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal</p>
                  <p className="font-medium text-gray-800">{selectedLaporan.tanggal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nomor WA</p>
                  <p className="font-medium text-gray-800">{selectedLaporan.nomorWa || '-'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Isi Laporan</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedLaporan.isiLaporan}</p>
                </div>
              </div>

              {selectedLaporan.bukti && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Bukti</p>
                  <a
                    href={selectedLaporan.bukti}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 underline break-all"
                  >
                    {selectedLaporan.bukti}
                  </a>
                </div>
              )}
            </div>

            {/* Update Form */}
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  data-testid="select-status-update"
                  value={updateData.status}
                  onChange={(e) => setUpdateData({...updateData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggapan</label>
                <textarea
                  data-testid="textarea-tanggapan"
                  value={updateData.tanggapan}
                  onChange={(e) => setUpdateData({...updateData, tanggapan: e.target.value})}
                  rows="4"
                  placeholder="Tulis tanggapan untuk pelapor..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleUpdateLaporan}
                  data-testid="button-save"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Simpan</span>
                </button>
                <button
                  onClick={() => setShowDetail(false)}
                  data-testid="button-cancel"
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;