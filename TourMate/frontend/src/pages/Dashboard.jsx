import React from 'react';
import { MapPin, Calendar as CalendarIcon, Users, ChevronRight, ChevronLeft, Star, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const destinosPopulares = [
        { id: 1, nombre: "Comuna 13, Medellín", rating: 4.8, img: "https://images.unsplash.com/photo-1731560818287-9186c6f18e29?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 2, nombre: "Parque Arví, Medellín", rating: 4.9, img: "https://t3.ftcdn.net/jpg/02/26/88/18/240_F_226881812_gpvhNHAQlsCw0F7vrYRBXi3iBPjpdeV9.jpg" },
        { id: 3, nombre: "Pueblito Paisa, Medellín", rating: 4.7, img: "https://as2.ftcdn.net/v2/jpg/17/95/18/63/1000_F_1795186347_52IpVWRguz4NKbWiXoTLEERrOijW6ogY.jpg" }
    ];

    const mejoresPaquetes = [
        { id: 1, titulo: "Tour Graffiti Comuna 13", ubicacion: "Comuna 13, Medellín", fecha: "15 Jun - 15 Jun", precioAnterior: "$120.000", precioActual: "$89.000", descuento: "25% Off", img: "https://as2.ftcdn.net/v2/jpg/20/07/15/09/1000_F_2007150917_LHhYqvNeAdYAjQMZKKTL7ePQ2dfzvJed.jpg" },
        { id: 2, titulo: "Experiencia Natural en Parque Arví", ubicacion: "Santa Elena, Medellín", fecha: "20 Jun - 20 Jun", precioAnterior: "$180.000", precioActual: "$145.000", descuento: "19% Off", img: "https://as2.ftcdn.net/v2/jpg/02/26/88/19/1000_F_226881975_aitlE3yQL9R8YjQYD4qGmpvUgINjusBK.jpg" },
        { id: 3, titulo: "Recorrido Cultural Centro Histórico", ubicacion: "Centro, Medellín", fecha: "05 Jul - 05 Jul", precioAnterior: "$90.000", precioActual: "$70.000", descuento: "22% Off", img: "https://as2.ftcdn.net/v2/jpg/06/45/11/43/1000_F_645114310_7oD7eWitOgAUJaq4fQJQGAkf35GAHuS4.jpg" },
        { id: 4, titulo: "Tour Nocturno por El Poblado", ubicacion: "El Poblado, Medellín", fecha: "12 Jul - 12 Jul", precioAnterior: "$150.000", precioActual: "$120.000", descuento: "20% Off", img: "https://blog.wynwood-house.com/hubfs/medellin-at-night.jpg" }
    ];

    return (
        <motion.div 
            className="max-w-7xl mx-auto space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-4 flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 border border-gray-100">
                <div className="flex items-center gap-3 px-4 w-full xl:w-auto border-b xl:border-b-0 xl:border-r border-gray-200 pb-2 xl:pb-0">
                    <MapPin className="text-[#4EA4D3]" size={20}/>
                    <div className="w-full">
                        <p className="text-xs text-gray-400">Destino</p>
                        <input type="text" placeholder="Ej. Pueblito paisa" className="font-semibold text-gray-700 outline-none w-full bg-transparent placeholder-gray-300" defaultValue=""/>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0">
                    <CalendarIcon className="text-[#4EA4D3]" size={20}/>
                    <div>
                        <p className="text-xs text-gray-400">Fecha de Ida</p>
                        <p className="font-semibold text-gray-700">15 Oct, 2026</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 w-full md:w-auto border-b md:border-b-0 xl:border-r border-gray-200 pb-2 md:pb-0">
                    <CalendarIcon className="text-[#4EA4D3]" size={20}/>
                    <div>
                        <p className="text-xs text-gray-400">Fecha de Vuelta</p>
                        <p className="font-semibold text-gray-700">22 Oct, 2026</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 w-full md:w-auto pb-2 md:pb-0">
                    <Users className="text-[#4EA4D3]" size={20}/>
                    <div>
                        <p className="text-xs text-gray-400">Viajeros</p>
                        <p className="font-semibold text-gray-700">02 <span className="text-gray-400 font-normal text-sm">Adultos</span> 00 <span className="text-gray-400 font-normal text-sm">Niños</span></p>
                    </div>
                </div>
                <button className="bg-[#4EA4D3] text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-md w-full xl:w-auto flex items-center justify-center gap-2">
                    <Plane size={18} />
                    Buscar Paquetes
                </button>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 space-y-8">
                    <motion.div variants={itemVariants}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Destinos Populares</h2>
                            <button className="text-[#4EA4D3] font-medium hover:underline">Ver Todos</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {destinosPopulares.map((destino) => (
                                <div key={destino.id} className="relative rounded-2xl overflow-hidden h-48 group cursor-pointer shadow-sm">
                                    <img src={destino.img} alt={destino.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-white text-xs font-bold">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" /> {destino.rating}
                                    </div>
                                    <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg w-3/4 leading-tight">{destino.nombre}</h3>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Mejores Paquetes Turísticos</h2>
                            <button className="text-[#4EA4D3] font-medium hover:underline">Ver Todos</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mejoresPaquetes.map((paquete) => (
                                <div key={paquete.id} className="bg-white rounded-2xl p-3 flex gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
                                    <img src={paquete.img} alt={paquete.titulo} className="w-24 h-24 rounded-xl object-cover" />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="font-bold text-gray-800 leading-tight group-hover:text-[#4EA4D3] transition-colors">{paquete.titulo}</h3>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12} className="text-[#4EA4D3]"/> {paquete.ubicacion}</p>
                                        </div>
                                        <div className="flex justify-between items-end mt-2">
                                            <p className="text-xs text-gray-500 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md"><CalendarIcon size={12}/> {paquete.fecha}</p>
                                            <div className="text-right">
                                                <p className="text-xs text-green-500 font-bold mb-0.5">{paquete.descuento}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs text-gray-400 line-through">{paquete.precioAnterior}</p>
                                                    <p className="text-lg font-bold text-[#4EA4D3] leading-none">{paquete.precioActual}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="xl:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800">Octubre 2026</h3>
                            <div className="flex gap-2 text-gray-400">
                                <ChevronLeft size={20} className="cursor-pointer hover:text-[#4EA4D3]" />
                                <ChevronRight size={20} className="cursor-pointer hover:text-[#4EA4D3]" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-yellow-400 rounded-sm"></div>
                            <span className="text-xs text-gray-500">Fechas más económicas</span>
                        </div>
                        
                        <div className="grid grid-cols-7 text-center gap-y-4 text-sm">
                            {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(day => (
                                <div key={day} className="text-gray-400 font-medium text-xs">{day}</div>
                            ))}
                            <div></div><div></div><div></div> 
                            {[...Array(31)].map((_, i) => {
                                const day = i + 1;
                                const isYellow = [15, 16, 28, 29].includes(day); 
                                return (
                                    <div key={day} className="flex justify-center items-center">
                                        <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium cursor-pointer transition-colors
                                            ${isYellow ? 'bg-yellow-400 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
                                        `}>
                                            {day}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}