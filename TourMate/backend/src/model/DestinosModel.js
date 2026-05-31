import { sql, poolConnection } from '../config/dataBase.js';

// 1. Listar todos los destinos
const listarDestinos = async () => {
    try {
        const pool = await poolConnection;
        const result = await pool.request().execute('spListarDestinos');
        return result.recordset;
    } catch (error) {
        console.error('Error al listar destinos:', error);
        throw error;
    }
};

// 2. Crear un nuevo destino (Usa @nombreLugar y spAñadirDestino)
const crearDestino = async (nombreLugar, descripcion, precio, ubicacion) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('nombreLugar', sql.VarChar, nombreLugar)
            .input('descripcion', sql.Text, descripcion)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('ubicacion', sql.VarChar, ubicacion)
            .execute('spAñadirDestino'); // Nombre exacto de tu Procedure
        return result;
    } catch (error) {
        console.error('Error al crear destino:', error);
        throw error;
    }
};

// 3. Actualizar un destino (Usa @idDestino y @nombreLugar)
const actualizarDestino = async (idDestino, nombreLugar, descripcion, precio, ubicacion) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('idDestino', sql.Int, idDestino)
            .input('nombreLugar', sql.VarChar, nombreLugar)
            .input('descripcion', sql.Text, descripcion)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('ubicacion', sql.VarChar, ubicacion)
            .execute('spActualizarDestino');
        return result;
    } catch (error) {
        console.error('Error al actualizar destino:', error);
        throw error;
    }
};

// 4. Eliminar un destino (Usa @idDestino)
const eliminarDestino = async (idDestino) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('idDestino', sql.Int, idDestino)
            .execute('spEliminarDestino');
        return result;
    } catch (error) {
        console.error('Error al eliminar destino:', error);
        throw error;
    }
};

export { 
    listarDestinos, 
    crearDestino, 
    actualizarDestino, 
    eliminarDestino 
};