import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Map, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/auth-context';

export default function Sidebar() {
    const { logout } = useAuth();

    const menuItems = [
        { path: '/dashboard', name: 'Inicio', icon: <Home size={20} /> },
        { path: '/reservas', name: 'Mis Reservas', icon: <Briefcase size={20} /> },
        { path: '/explorar', name: 'Explorar Destinos', icon: <Map size={20} /> },
        { path: '/favoritos', name: 'Favoritos', icon: <Heart size={20} /> },
        { path: '/configuracion', name: 'Configuración', icon: <Settings size={20} /> },
    ];

    return (
        <aside className="w-64 bg-white h-screen hidden md:flex flex-col justify-between shadow-lg sticky top-0 rounded-r-3xl z-40">
            <div className="p-6">
                <nav className="flex flex-col gap-2 mt-4">
                    {menuItems.map((item) => (
                        <NavLink 
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => 
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                                    isActive 
                                    ? 'bg-[#4EA4D3] text-white shadow-md' 
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-[#4EA4D3]'
                                }`
                            }
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-6">
                <button 
                    onClick={logout}
                    className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 w-full rounded-xl transition-colors"
                >
                </button>
            </div>
        </aside>
    );
}