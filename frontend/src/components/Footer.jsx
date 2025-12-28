import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">LAPOR! OSIS</h3>
            <p className="text-sm text-gray-600">
              Layanan Aspirasi dan Pengaduan Online Remaja. Suaramu, perubahan untuk sekolah kita.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Menu</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/aspirasi" className="hover:text-green-600">Aspirasiku</a></li>
              <li><a href="/laporan" className="hover:text-green-600">Laporanku</a></li>
              <li><a href="/cek-laporan" className="hover:text-green-600">Cek Laporan</a></li>
              <li><a href="/statistik" className="hover:text-green-600">Statistik</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Kontak</h3>
            <p className="text-sm text-gray-600">
              OSIS SMA Negeri X<br />
              Email: osis@sekolah.sch.id<br />
              WhatsApp: 0812-3456-7890
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center">
            Dibuat dengan <Heart size={16} className="text-red-500 mx-1" /> untuk siswa-siswi SMA
          </p>
          <p className="text-xs text-gray-500 mt-2">
            © 2025 LAPOR! OSIS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;