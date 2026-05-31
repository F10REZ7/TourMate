import { sql, poolConnection } from '../config/dataBase.js';

// 1. Listar (Asegúrate de que este procedure exista con este nombre exacto)
const listarEmpleados = async () => {
    try {
        const pool = await poolConnection;
        const result = await pool.request().execute('spListarEmpleados'); 
        return result.recordset;
    } catch (error) {
        console.error('Error al listar:', error);
        throw error;
    }
};

const crearEmpleado = async (nombre, correo, telefono, idiomas, especialidad, descripcion, tarifa_estandar) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('correo', sql.VarChar, correo)
            .input('telefono', sql.VarChar, telefono)
            .input('idiomas', sql.VarChar, idiomas)
            .input('especialidad', sql.VarChar, especialidad)
            .input('descripcion', sql.Text, descripcion)
            .input('tarifa_estandar', sql.Decimal(10, 2), tarifa_estandar)
            .execute('spInsertarEmpleado'); 
        return result;
    } catch (error) {
        console.error('Error al crear:', error);
        throw error;
    }
};

// 3. Actualizar (Verifica el nombre en tu SQL)
const actualizarEmpleado = async (idEmpleado, nombre, correo, telefono, idiomas, especialidad, descripcion, tarifa_estandar) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('idEmpleado', sql.Int, idEmpleado)
            .input('nombre', sql.VarChar, nombre)
            .input('correo', sql.VarChar, correo)
            .input('telefono', sql.VarChar, telefono)
            .input('idiomas', sql.VarChar, idiomas)
            .input('especialidad', sql.VarChar, especialidad)
            .input('descripcion', sql.Text, descripcion)
            .input('tarifa_estandar', sql.Decimal(10, 2), tarifa_estandar)
            .execute('spActualizarEmpleado'); 
        return result;
    } catch (error) {
        console.error('Error al actualizar:', error);
        throw error;
    }
};

// 4. Eliminar
const eliminarEmpleado = async (idEmpleado) => {
    try {
        const pool = await poolConnection;
        const result = await pool.request()
            .input('idEmpleado', sql.Int, idEmpleado)
            .execute('spEliminarEmpleado');
        return result;
    } catch (error) {
        console.error('Error al eliminar:', error);
        throw error;
    }
};

export { listarEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado };