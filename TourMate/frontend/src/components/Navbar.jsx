import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context.jsx'; // Ajustado según tu estructura en App.jsx

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Cierra el menú flotante si el usuario hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate('/');
    };

    return (
        <header className="bg-gray-200 shadow-md"> 
            <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">

                {/* Contenedor del Logo (Se mantiene igual) */}
                <Link to="/" className="flex items-center gap-2 content-center">
                    <img src="/logo.png" alt="TourMate Logo" className="w-8 h-8"/>
                    <span className="font-bold text-lg text-gray-800">TourMate</span>
                </Link>

                {/* Contenedor de Navegación y Autenticación */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-blue-600 font-medium transition-colors">Inicio</Link>
                    <Link to="/destinos" className="hover:text-blue-600 font-medium transition-colors">Destinos</Link>
                    
                    {user ? (
                        /* Requisito 1 y 3: Menú desplegable para usuario autenticado */
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 focus:outline-none hover:bg-gray-300 p-1 px-3 rounded-full transition-all"
                            >
                                {/* Requisito 2: Foto de perfil por defecto y mensaje dinámico */}
                                <img 
                                    src="/default-avatar.png" 
                                    alt="Perfil" 
                                    className="w-8 h-8 rounded-full object-cover border border-gray-400" 
                                />
                                <span className="font-semibold text-gray-700">
                                    Hola, {user.nombre.split(' ')[0]}
                                </span>
                            </button>

                            {/* Requisito 3: Estructura del Dropdown con Tailwind */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100 flex flex-col animate-fadeIn">
                                    <Link 
                                        to="/dashboard" 
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link 
                                        to="/configuracion" 
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Configuración
                                    </Link>
                                    
                                    <hr className="my-1 border-gray-200" />
                                    
                                    {/* Requisito 4: Botón de cierre de sesión */}
                                    <button 
                                        onClick={handleLogout} 
                                        className="px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50 text-left w-full transition-colors"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Estado No Autenticado: Muestra el botón de siempre */
                        <Link to="/auth" className="hover:text-blue-600 font-medium transition-colors">
                            Iniciar Sesion
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}