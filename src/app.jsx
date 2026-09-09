import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Kiosk from './pages/Kiosk';
import Admin from './pages/Admin';
import PainelUsuario from './pages/PainelUsuario';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/painel-usuario" element={<PainelUsuario />} />
      </Routes>
    </Router>
  );
}
