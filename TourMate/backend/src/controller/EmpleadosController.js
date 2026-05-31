import { listarEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado } from "../model/EmpleadosModel.js";

// 1. OBTENER
export const getEmpleados = async (req, res) => {
    try {
        const empleados = await listarEmpleados();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener empleados" });
    }
};

// 2. AGREGAR
export const addEmpleado = async (req, res) => {
    const { nombre, correo, telefono, idiomas, especialidad, descripcion, tarifa_estandar } = req.body;
    try {
        await crearEmpleado(nombre, correo, telefono, idiomas, especialidad, descripcion, tarifa_estandar);
        res.status(201).json({ message: "Empleado creado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear empleado" });
    }
};

// 3. ACTUALIZAR
export const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, idiomas, especialidad, descripcion, tarifa_estandar } = req.body;
    try {
        await actualizarEmpleado(id, nombre, correo, telefono, idiomas, especialidad, descripcion, tarifa_estandar);
        res.status(200).json({ message: "Empleado actualizado" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};

// 4. ELIMINAR
export const deleteEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        await eliminarEmpleado(id);
        res.status(200).json({ message: "Empleado eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};