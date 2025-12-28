import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true';
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/aspirasi', label: 'Aspirasiku' },
    { path: '/laporan', label: 'Laporanku' },
    { path: '/cek-laporan', label: 'Cek Laporan' },
    { path: '/statistik', label: 'Statistik' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" data-testid="navbar-logo">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">L!</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">LAPOR! OSIS</h1>
              <p className="text-xs text-gray-500">Layanan Aspirasi & Pengaduan</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {!isAdminPage && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-green-100 text-green-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isAdminPage && (
              <Link
                to="/admin"
                data-testid="nav-link-admin"
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Admin
              </Link>
            )}
            {isAdminPage && isAdmin && (
              <button
                onClick={handleLogout}
                data-testid="logout-button"
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4" data-testid="mobile-menu">
            {!isAdminPage && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg mb-1 ${
                  location.pathname === link.path
                    ? 'bg-green-100 text-green-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isAdminPage && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-2"
              >
                Admin
              </Link>
            )}
            {isAdminPage && isAdmin && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-2 flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;