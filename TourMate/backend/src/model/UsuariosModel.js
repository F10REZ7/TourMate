import { sql, poolConnection } from '../config/dataBase.js';

const listarUsuarios = async () => {
    try {
        const pool = await poolConnection;
        const result = await pool.request().execute('spListarUsuarios');
        return result.recordset;
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        throw error;
    }
};

// NUEVA FUNCIÓN: Ejecuta el SP para registrar
const crearUsuario = async (nombre, email, password) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            // procedimiento almacenado exista en el SQL Server
            .execute('spRegistrarUsuario'); 
        return result;
    } catch (error) {
        console.error('Error en DB al crear usuario:', error);
        throw error;
    }
};

const buscarUsuarioPorEmail = async (email) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .execute('spBuscarUsuarioPorEmail');
        
        // Retornamos el primer registro si existe
        return result.recordset[0]; 
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        throw error;
    }
};

// NUEVA FUNCIÓN: Actualizar usuario
const actualizarUsuario = async (id, nombre, email, password) => {
    try {
        const pool = await poolConnection;
        const request = pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('email', sql.VarChar, email);

        // Si mandaron contraseña nueva, la actualizamos
        if (password) {
            request.input('password', sql.VarChar, password);
        } else {
            request.input('password', sql.VarChar, null);
        }

        const result = await request.execute('spActualizarUsuario'); 
        return result;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
};

// NUEVA FUNCIÓN: Eliminar usuario
const eliminarUsuario = async (id) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('spEliminarUsuario'); 
        return result;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
};

export { listarUsuarios, crearUsuario, buscarUsuarioPorEmail, actualizarUsuario, eliminarUsuario };