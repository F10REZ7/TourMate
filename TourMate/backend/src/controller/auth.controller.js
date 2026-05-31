const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Tu configuración de conexión a SQL

const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Ejemplo usando procedimiento almacenado como mencionaste anteriormente
        await db.query('CALL sp_registrar_usuario(?, ?, ?)', [nombre, email, hashedPassword]);

        res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

        // Generar el Token (JWT)
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, // Definir esto en el archivo .env
            { expiresIn: '8h' }
        );

        res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = { register, login };