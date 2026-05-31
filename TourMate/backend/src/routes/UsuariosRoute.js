
import { getUsuarios, register, login, updateUsuario, deleteUsuario } from "../controller/UsuariosController.js";
import express from "express";

const router = express.Router();


router.get('/usuarios', getUsuarios);
router.post('/register', register); 
router.post('/login', login);      


router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

export default router;