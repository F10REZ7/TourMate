import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context.jsx';
import axios from 'axios';
import './Auth.css';

const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const IMAGES_CAROUSEL = ['/about1.jpg', '/about2.jpg', '/about3.jpg'];

const AuthLayout = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % IMAGES_CAROUSEL.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `http://localhost:4000/api/auth/${isLogin ? 'login' : 'register'}`;

        try {
            const response = await axios.post(url, formData);
            const data = response.data;

            if (isLogin) {
                login(data.user, data.token);

                // 🔥 REDIRECCIÓN SEGÚN ADMIN O USER
                if (data.user.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }

                console.log('Login exitoso');

            } else {
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                setIsLogin(true);
                setFormData({ nombre: '', email: '', password: '' });
            }

        } catch (error) {
            if (error.response) {
                alert(error.response.data.error || "Hubo un problema con la solicitud");
            } else if (error.request) {
                alert("No se pudo conectar con el servidor. Revisa que el backend esté encendido.");
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    return (
        <div className="auth-outer-wrapper">

            <div className="auth-background-layer">
                <img src="/loginBackground.jpg" alt="Background" className='background-image' />
            </div>

            <div className="auth-page-container">
                <div className="auth-card-wrapper">

                    {/* LEFT CAROUSEL */}
                    <div className="auth-carousel">
                        <Link to="/" className="back-home-btn">
                            <BackIcon /><span>Volver al Home</span>
                        </Link>

                        <img
                            src={IMAGES_CAROUSEL[currentImage]}
                            alt="TourMate"
                            className="carousel-image"
                        />

                        <div className="carousel-overlay">
                            <h2>Capturando Momentos,<br />Creando Recuerdos</h2>

                            <div className="pagination-dots">
                                {IMAGES_CAROUSEL.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === currentImage ? 'active' : ''}`}
                                        onClick={() => setCurrentImage(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT FORM */}
                    <div className="auth-form-section">

                        <div className="form-header">
                            <div className="form-top-toggle">
                                <p>
                                    {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}

                                    <button
                                        className="toggle-btn"
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {isLogin ? "Crear cuenta" : "Inicia sesión"}
                                    </button>
                                </p>
                            </div>

                            <div className="form-logo-container">
                                <img src="/logo.png" alt="Logo" className="form-logo" />
                            </div>
                        </div>

                        <div className="form-body">
                            <h1>{isLogin ? "Iniciar Sesión" : "Crear una cuenta"}</h1>

                            <form onSubmit={handleSubmit}>

                                {!isLogin && (
                                    <div className="input-group">
                                        <label>Nombre completo</label>
                                        <input
                                            name="nombre"
                                            type="text"
                                            placeholder="Ej. Juan Pérez"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="input-group">
                                    <label>Correo electrónico</label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Contraseña</label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="primary-submit-btn">
                                    {isLogin ? "Ingresar" : "Crear cuenta"}
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;