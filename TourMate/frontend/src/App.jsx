import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/auth-context.jsx'
import Header from './components/Navbar'
import Home from './pages/Home'
import AuthLayout from './components/Auth'
import Dashboard from './pages/Dashboard.jsx'
import Admin from './pages/Admin.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* --- RUTA DE INICIO --- */}
          {/* Quitamos el fragmento con Header para evitar el doble Navbar */}
          <Route path="/" element={<Home />} />
          
          {/* --- AUTENTICACIÓN --- */}
          <Route path="/auth" element={<AuthLayout />} />

          {/* --- RUTAS DEL USUARIO (CON SU BARRA LATERAL) --- */}
          <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* --- RUTA DEL ADMIN (TOTALMENTE LIMPIA) --- */}
          <Route path="/admin" element={<Admin />} />

          {/* Manejo de errores */}
          <Route path="*" element={<div className="h-screen flex items-center justify-center font-bold">404 - No encontrado</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App