import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom'; // Outlet renderiza la página hija

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar Fijo Izquierdo */}
            <Sidebar />

            {/* Contenedor Principal Derecho */}
            <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
                {/* Reutilizamos el Navbar arriba del contenido del dashboard */}
                <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-sm rounded-b-2xl mx-4">
                    <Navbar />
                </div>

                {/* Área de contenido de la página (Dashboard, Tickets, etc) */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}