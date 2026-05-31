import { getEmpleados, addEmpleado, updateEmpleado, deleteEmpleado } from "../controller/EmpleadosController.js";
import express from "express";

const router = express.Router();

// Obtener todos los empleados (GET)
router.get('/empleados', getEmpleados);

// Crear un nuevo empleado (POST)
router.post('/empleados', addEmpleado);

// Actualizar un empleado existente por su ID (PUT)
router.put('/empleados/:id', updateEmpleado);

// Eliminar un empleado por su ID (DELETE)
router.delete('/empleados/:id', deleteEmpleado);

export default router;