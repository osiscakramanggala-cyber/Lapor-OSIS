import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { googleSheetsAPI } from '../utils/googleSheets';
import { toast } from 'sonner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Statistik = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStatistik();
  }, []);

  const fetchStatistik = async () => {
    try {
      const result = await googleSheetsAPI.getStatistik();
      
      if (result.status === 'success') {
        setStats(result.data);
      } else {
        toast.error('Gagal memuat statistik');
      }
    } catch (error) {
      toast.error('Gagal memuat statistik');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat statistik...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Gagal memuat statistik</p>
        </div>
      </div>
    );
  }

  // Status Chart Data
  const statusChartData = {
    labels: ['Menunggu', 'Diproses', 'Selesai'],
    datasets: [
      {
        label: 'Jumlah Laporan',
        data: [stats.menunggu, stats.diproses, stats.selesai],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Jenis Laporan Chart Data
  const jenisLabels = Object.keys(stats.byJenis || {});
  const jenisData = Object.values(stats.byJenis || {});

  const jenisChartData = {
    labels: jenisLabels.length > 0 ? jenisLabels : ['Tidak ada data'],
    datasets: [
      {
        label: 'Jumlah Laporan',
        data: jenisData.length > 0 ? jenisData : [0],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const statCards = [
    {
      label: 'Total Laporan',
      value: stats.total,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      testId: 'stat-total'
    },
    {
      label: 'Menunggu',
      value: stats.menunggu,
      icon: <Clock className="w-6 h-6" />,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      testId: 'stat-menunggu'
    },
    {
      label: 'Diproses',
      value: stats.diproses,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      testId: 'stat-diproses'
    },
    {
      label: 'Selesai',
      value: stats.selesai,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      testId: 'stat-selesai'
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8" data-testid="statistik-header">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Statistik Laporan</h1>
          <p className="text-gray-600">
            Data dan grafik laporan yang masuk
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-testid="stat-cards">
          {statCards.map((stat, index) => (
            <div
              key={index}
              data-testid={stat.testId}
              className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-lg ${stat.textColor}`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6" data-testid="status-chart">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Status Laporan</h3>
            <div className="h-64">
              <Bar data={statusChartData} options={chartOptions} />
            </div>
          </div>

          {/* Jenis Laporan Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6" data-testid="jenis-chart">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Jenis Laporan</h3>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={jenisChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Tujuan List */}
        {stats.byTujuan && Object.keys(stats.byTujuan).length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6" data-testid="tujuan-list">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Laporan per Tujuan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.byTujuan)
                .sort((a, b) => b[1] - a[1])
                .map(([tujuan, count], index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">{tujuan}</p>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6" data-testid="info-box">
          <h3 className="font-semibold text-green-900 mb-2">Tentang Statistik:</h3>
          <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
            <li>Data diambil langsung dari database laporan</li>
            <li>Statistik diperbarui secara real-time</li>
            <li>Grafik menampilkan distribusi laporan berdasarkan status dan jenis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistik;