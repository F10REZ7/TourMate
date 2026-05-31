import React, { useState, useEffect } from 'react';
import { Users, Plane, Edit3, XCircle, Plus, LayoutDashboard, Save, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Admin() {
    const API_BASE = "http://localhost:4000/api";
    const API_AUTH = "http://localhost:4000/api/auth";

    const [view, setView] = useState('usuarios');
    const [usuarios, setUsuarios] = useState([]);
    const [destinos, setDestinos] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    const [userForm, setUserForm] = useState({ nombre: '', email: '', password: '' });
    const [destinoForm, setDestinoForm] = useState({ nombreLugar: '', descripcion: '', precio: '', ubicacion: '' });
    
    // ESTADO ACTUALIZADO: Coincide con tblEmpleados
    const [empleadoForm, setEmpleadoForm] = useState({ 
        nombre: '', correo: '', telefono: '', idiomas: '', especialidad: '', descripcion: '', tarifa_estandar: '' 
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (view === 'usuarios') fetchUsuarios();
        else if (view === 'destinos') fetchDestinos();
        else if (view === 'empleados') fetchEmpleados();
        resetForm();
    }, [view]);

    const resetForm = () => {
        setUserForm({ nombre: '', email: '', password: '' });
        setDestinoForm({ nombreLugar: '', descripcion: '', precio: '', ubicacion: '' });
        setEmpleadoForm({ nombre: '', correo: '', telefono: '', idiomas: '', especialidad: '', descripcion: '', tarifa_estandar: '' });
        setIsEditing(false);
        setEditId(null);
    };

    const fetchUsuarios = async () => {
        try {
            const r = await fetch(`${API_AUTH}/usuarios`);
            setUsuarios(await r.json());
        } catch (e) { console.error(e); }
    };
    
    const fetchDestinos = async () => {
        try {
            const r = await fetch(`${API_BASE}/destinos`);
            const d = await r.json();
            setDestinos(Array.isArray(d) ? d : d.data || []);
        } catch (e) { console.error(e); }
    };

    const fetchEmpleados = async () => {
        try {
            const r = await fetch(`${API_BASE}/empleados`);
            const d = await r.json();
            setEmpleados(Array.isArray(d) ? d : d.data || []);
        } catch (e) { console.error(e); }
    };

    const handleGlobalSubmit = async () => {
        let url, body, callback;
        
        if (view === 'usuarios') {
            url = isEditing ? `${API_AUTH}/usuarios/${editId}` : `${API_AUTH}/register`;
            body = userForm;
            callback = fetchUsuarios;
        } else if (view === 'destinos') {
            url = isEditing ? `${API_BASE}/destinos/${editId}` : `${API_BASE}/destinos`;
            body = destinoForm;
            callback = fetchDestinos;
        } else {
            url = isEditing ? `${API_BASE}/empleados/${editId}` : `${API_BASE}/empleados`;
            body = empleadoForm;
            callback = fetchEmpleados;
        }

        try {
            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                alert("Operación exitosa");
                resetForm();
                callback();
            } else {
                const err = await response.json();
                alert("Error: " + (err.error || "No se pudo guardar"));
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    const deleteItem = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este registro?")) return;
        
        let url;
        if (view === 'usuarios') url = `${API_AUTH}/usuarios/${id}`;
        else url = `${API_BASE}/${view}/${id}`;
        
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.ok) {
                if (view === 'usuarios') fetchUsuarios();
                else if (view === 'destinos') fetchDestinos();
                else fetchEmpleados();
            }
        } catch (e) { console.error(e); }
    };

    return (
        <div className="flex min-h-screen bg-[#E0E0E0] font-sans w-full text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-[#5FB3E2] to-[#3489BD] text-white flex flex-col shadow-xl">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg"><LayoutDashboard size={24} /></div>
                    <h1 className="text-2xl font-bold tracking-tight">TourMate</h1>
                </div>
                <nav className="mt-10 flex-1">
                    {[
                        { id: 'usuarios', icon: Users, label: 'Usuarios' },
                        { id: 'destinos', icon: Plane, label: 'Destinos' },
                        { id: 'empleados', icon: Briefcase, label: 'Empleados' }
                    ].map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`flex items-center gap-4 px-10 py-4 cursor-pointer transition-all ${view === item.id ? 'bg-[#4EA4D3] shadow-lg border-r-4 border-white' : 'hover:bg-white/10'}`}
                        >
                            <item.icon size={22} className={item.id === 'destinos' ? 'rotate-45' : ''} />
                            <span className="font-semibold text-lg">{item.label}</span>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800">Gestión de {view.charAt(0).toUpperCase() + view.slice(1)}</h2>
                    </div>

                    {/* Formulario Dinámico */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">{isEditing ? 'Editar Registro' : 'Nuevo Registro'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {view === 'usuarios' && (
                                <>
                                    <input type="text" placeholder="Nombre" value={userForm.nombre} onChange={e=>setUserForm({...userForm, nombre:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="email" placeholder="Correo" value={userForm.email} onChange={e=>setUserForm({...userForm, email:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="password" placeholder="Password" value={userForm.password} onChange={e=>setUserForm({...userForm, password:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                </>
                            )}
                            {view === 'destinos' && (
                                <>
                                    <input type="text" placeholder="Lugar" value={destinoForm.nombreLugar} onChange={e=>setDestinoForm({...destinoForm, nombreLugar:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="number" placeholder="Precio" value={destinoForm.precio} onChange={e=>setDestinoForm({...destinoForm, precio:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="text" placeholder="Ubicación" value={destinoForm.ubicacion} onChange={e=>setDestinoForm({...destinoForm, ubicacion:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="text" placeholder="Descripción" value={destinoForm.descripcion} onChange={e=>setDestinoForm({...destinoForm, descripcion:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                </>
                            )}
                            {view === 'empleados' && (
                                <>
                                    <input type="text" placeholder="Nombre completo" value={empleadoForm.nombre} onChange={e=>setEmpleadoForm({...empleadoForm, nombre:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="email" placeholder="Correo electrónico" value={empleadoForm.correo} onChange={e=>setEmpleadoForm({...empleadoForm, correo:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="text" placeholder="Teléfono" value={empleadoForm.telefono} onChange={e=>setEmpleadoForm({...empleadoForm, telefono:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="text" placeholder="Idiomas" value={empleadoForm.idiomas} onChange={e=>setEmpleadoForm({...empleadoForm, idiomas:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="text" placeholder="Especialidad" value={empleadoForm.especialidad} onChange={e=>setEmpleadoForm({...empleadoForm, especialidad:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <input type="number" placeholder="Tarifa ($)" value={empleadoForm.tarifa_estandar} onChange={e=>setEmpleadoForm({...empleadoForm, tarifa_estandar:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3]" />
                                    <textarea placeholder="Descripción del perfil" value={empleadoForm.descripcion} onChange={e=>setEmpleadoForm({...empleadoForm, descripcion:e.target.value})} className="bg-[#F1F1F1] p-3 rounded-xl outline-none focus:ring-2 ring-[#4EA4D3] col-span-1 md:col-span-2 h-12 resize-none" />
                                </>
                            )}
                            <button onClick={handleGlobalSubmit} className="bg-[#4EA4D3] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#3489BD] transition-all h-12 shadow-md">
                                {isEditing ? <Save size={20}/> : <Plus size={20}/>} {isEditing ? "Actualizar" : "Agregar"}
                            </button>
                        </div>
                    </div>

                    {/* Tabla de Datos */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-800 font-bold border-b">
                                        <th className="pb-4 px-2">ID</th>
                                        <th className="pb-4 px-2">Nombre / Info</th>
                                        <th className="pb-4 px-2">Detalles</th>
                                        <th className="pb-4 px-2 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600">
                                    {/* RENDERIZADO DE EMPLEADOS */}
                                    {view === 'empleados' && empleados.map(e => (
                                        <tr key={e.idEmpleado} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-2">{e.idEmpleado}</td>
                                            <td className="py-4 px-2 font-semibold text-gray-800">{e.nombre}</td>
                                            <td className="py-4 px-2">
                                                <span className="block text-xs text-[#4EA4D3] font-bold uppercase">{e.especialidad}</span>
                                                <span className="text-sm">{e.idiomas} • ${e.tarifa_estandar}</span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Edit3 size={18} className="text-[#4EA4D3] cursor-pointer hover:scale-110" 
                                                        onClick={() => { 
                                                            setIsEditing(true); 
                                                            setEditId(e.idEmpleado); 
                                                            setEmpleadoForm(e); 
                                                        }} 
                                                    />
                                                    <XCircle size={18} className="text-red-400 cursor-pointer hover:scale-110" onClick={() => deleteItem(e.idEmpleado)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* RENDERIZADO DE DESTINOS */}
                                    {view === 'destinos' && destinos.map(d => (
                                        <tr key={d.idDestino} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-2">{d.idDestino}</td>
                                            <td className="py-4 px-2 font-semibold text-gray-800">{d.nombreLugar}</td>
                                            <td className="py-4 px-2">${d.precio} - {d.ubicacion}</td>
                                            <td className="py-4 px-2 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Edit3 size={18} className="text-[#4EA4D3] cursor-pointer hover:scale-110" onClick={() => { setIsEditing(true); setEditId(d.idDestino); setDestinoForm(d); }} />
                                                    <XCircle size={18} className="text-red-400 cursor-pointer hover:scale-110" onClick={() => deleteItem(d.idDestino)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* RENDERIZADO DE USUARIOS */}
                                    {view === 'usuarios' && usuarios.map(u => (
                                        <tr key={u.id} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-2">{u.id}</td>
                                            <td className="py-4 px-2 font-semibold text-gray-800">{u.nombre}</td>
                                            <td className="py-4 px-2">{u.email}</td>
                                            <td className="py-4 px-2 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Edit3 size={18} className="text-[#4EA4D3] cursor-pointer hover:scale-110" onClick={() => { setIsEditing(true); setEditId(u.id); setUserForm({nombre: u.nombre, email: u.email, password: ''}); }} />
                                                    <XCircle size={18} className="text-red-400 cursor-pointer hover:scale-110" onClick={() => deleteItem(u.id)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}