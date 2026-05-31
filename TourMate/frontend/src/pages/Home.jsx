import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import "./Home.css";

export default function Home() {

    const images = [
        "/about1.jpg",
        "/about2.jpg",
        "/about3.jpg"
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

    return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Navbar/>
            <Hero />

            <section className="about">
                <div className="about-container">

                    {/* Texto */}
                    <div className="about-text">
                        <h2>¿Quiénes somos?</h2>
                        <p>Somos una plataforma que conecta viajeros con guías turísticos
                        locales para ofrecer experiencias auténticas y personalizadas
                        en cada destino.
                        </p>
                        <button className="about-btn">Conocer más</button>
                    </div>
                    {/* Slider de imágenes */}
                    <div className="about-image">
                        <img src={images[currentImage]} alt="Acerca de nosotros" className="about-slider"/>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
} 