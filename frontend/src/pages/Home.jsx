import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, Search, BarChart3, Shield, Clock, Users } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Aspirasiku',
      description: 'Sampaikan kritik dan saran untuk organisasi, ekstrakurikuler, atau sekolah',
      path: '/aspirasi',
      color: 'from-blue-400 to-blue-600',
      testId: 'feature-aspirasi'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Laporanku',
      description: 'Laporkan kasus bullying atau pelanggaran siswa dengan aman',
      path: '/laporan',
      color: 'from-red-400 to-red-600',
      testId: 'feature-laporan'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Cek Laporan',
      description: 'Pantau status laporan kamu dengan kode unik',
      path: '/cek-laporan',
      color: 'from-purple-400 to-purple-600',
      testId: 'feature-cek-laporan'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Statistik',
      description: 'Lihat data dan statistik laporan yang masuk',
      path: '/statistik',
      color: 'from-green-400 to-green-600',
      testId: 'feature-statistik'
    },
  ];

  const stats = [
    { icon: <Shield className="w-6 h-6" />, label: 'Aman & Terpercaya', value: '100%' },
    { icon: <Clock className="w-6 h-6" />, label: 'Respon Cepat', value: '24 Jam' },
    { icon: <Users className="w-6 h-6" />, label: 'Anonim', value: 'Ya' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-white to-green-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center" data-testid="hero-section">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
            <span className="text-green-700 text-sm font-semibold">Layanan Aspirasi & Pengaduan</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Selamat Datang di<br />
            <span className="text-green-600">LAPOR! OSIS</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sampaikan aspirasi, kritik, saran, atau laporkan masalah di sekolah. 
            Suaramu penting untuk perubahan yang lebih baik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/aspirasi')}
              data-testid="hero-button-aspirasi"
              className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Kirim Aspirasi
            </button>
            <button
              onClick={() => navigate('/laporan')}
              data-testid="hero-button-laporan"
              className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg"
            >
              Buat Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8" data-testid="stats-section">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg text-green-600">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16" data-testid="features-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Layanan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih layanan yang kamu butuhkan untuk menyampaikan aspirasimu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              data-testid={feature.testId}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
            >
              <div className={`inline-flex p-4 bg-gradient-to-br ${feature.color} text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-green-50 py-16 px-4" data-testid="how-it-works-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Cara Kerja</h2>
            <p className="text-gray-600">Mudah dan cepat, hanya 3 langkah</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Isi Form</h3>
              <p className="text-gray-600">Sampaikan aspirasi atau laporan kamu melalui form yang tersedia</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Dapatkan Kode</h3>
              <p className="text-gray-600">Simpan kode laporan yang diberikan untuk tracking status</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pantau Status</h3>
              <p className="text-gray-600">Cek status laporan kamu kapan saja dengan kode tersebut</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl" data-testid="cta-section">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Siap Menyampaikan Aspirasimu?</h2>
          <p className="text-lg mb-8 opacity-90">Bersama kita wujudkan sekolah yang lebih baik</p>
          <button
            onClick={() => navigate('/aspirasi')}
            data-testid="cta-button"
            className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;