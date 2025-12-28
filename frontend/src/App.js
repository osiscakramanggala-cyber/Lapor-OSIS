import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Aspirasi from './pages/Aspirasi';
import Laporan from './pages/Laporan';
import CekLaporan from './pages/CekLaporan';
import Statistik from './pages/Statistik';
import Admin from './pages/Admin';
import './App.css';

// 🔍 Tambahkan baris ini untuk cek apakah .env terbaca:
console.log("Google Script URL:", process.env.REACT_APP_GOOGLE_SCRIPT_URL);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aspirasi" element={<Aspirasi />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/cek-laporan" element={<CekLaporan />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;