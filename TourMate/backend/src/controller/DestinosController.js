import { listarDestinos, crearDestino, actualizarDestino, eliminarDestino } from "../model/DestinosModel.js";

// 1. OBTENER
export const getDestinos = async (req, res) => {
    try {
        const destinos = await listarDestinos();
        res.status(200).json(destinos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener destinos" });
    }
};

// 2. AGREGAR (Aquí es donde estaba el error, asegúrate de que se llame 'addDestino')
export const addDestino = async (req, res) => {
    const { nombreLugar, descripcion, precio, ubicacion } = req.body;
    try {
        await crearDestino(nombreLugar, descripcion, precio, ubicacion);
        res.status(201).json({ message: "Destino creado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear destino" });
    }
};

// 3. ACTUALIZAR
export const updateDestino = async (req, res) => {
    const { id } = req.params;
    const { nombreLugar, descripcion, precio, ubicacion } = req.body;
    try {
        await actualizarDestino(id, nombreLugar, descripcion, precio, ubicacion);
        res.status(200).json({ message: "Destino actualizado" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};

// 4. ELIMINAR
export const deleteDestino = async (req, res) => {
    const { id } = req.params;
    try {
        await eliminarDestino(id);
        res.status(200).json({ message: "Destino eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};