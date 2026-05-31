import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Importaciones actualizadas con las nuevas funciones del modelo
import { listarUsuarios, crearUsuario, buscarUsuarioPorEmail, actualizarUsuario, eliminarUsuario } from '../model/UsuariosModel.js';

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await listarUsuarios(); // Llama al SP de SQL
        res.status(200).json(usuarios);         // Devuelve la lista en formato JSON
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios de la base de datos" });
    }
};

export const register = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        // 1. Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 2. Guardar en la base de datos usando el modelo
        await crearUsuario(nombre, email, hashedPassword);
        
        // 3. Responder al frontend
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ error: "Error interno al guardar en la base de datos" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Buscar si el usuario existe
        const user = await buscarUsuarioPorEmail(email);
        if (!user) {
            return res.status(400).json({ error: "El correo electrónico no está registrado" });
        }

        // 2. Comparar la contraseña ingresada con el hash almacenado en la BD
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "La contraseña es incorrecta." });
        }

        // 3. Generar un token JWT
        // Guardar el ID y nombre en el payload para usarlos en el header
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre }, 
            process.env.JWT_SECRET, 
            { expiresIn: '8h' }
        );

        // 4. Enviar respuesta exitosa
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// NUEVA FUNCIÓN: Actualizar Usuario
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    
    try {
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        
        await actualizarUsuario(id, nombre, email, hashedPassword);
        res.status(200).json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

// NUEVA FUNCIÓN: Eliminar Usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    
    try {
        await eliminarUsuario(id);
        res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};