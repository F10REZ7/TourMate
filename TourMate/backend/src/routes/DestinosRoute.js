import { getDestinos, addDestino, updateDestino, deleteDestino } from "../controller/DestinosController.js";
import express from "express";

const router = express.Router();

// Obtener todos los destinos (GET)
router.get('/destinos', getDestinos);

// Crear un nuevo destino (POST)
router.post('/destinos', addDestino);

// Actualizar un destino existente por su ID (PUT)
// Usamos :id para recibir el idDestino desde la URL
router.put('/destinos/:id', updateDestino);

// Eliminar un destino por su ID (DELETE)
router.delete('/destinos/:id', deleteDestino);

export default router;