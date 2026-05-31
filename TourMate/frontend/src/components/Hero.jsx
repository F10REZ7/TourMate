import React from 'react'

export default function Hero() {
  return (
    <>
        <section className="relative h-[700px] bg-cover bg-center flex items-center justify-start pl-70" style={{ backgroundImage: "url('/hero.jpg')" }}>

            <div className="bg-black/65 text-white p-8 rounded-xl max-w-lg mt-10">
                <h1 className="text-4xl font-bold mb-4">ENCUENTRA EL GUIA TURISTICO PERFECTO</h1>
                
                <p className="font-sans mb-6">Responde un cuestionario breve y obten recomendaciones personalizadas</p>
                <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 px-6 py-2 rounded-lg text-white">Comenzar cuestionario</button>
            </div>
        </section>
    </>
  )
}
