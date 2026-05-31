import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoute from "./routes/UsuariosRoute.js";
import destinosRoute from "./routes/DestinosRoute.js";
dotenv.config()

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', usuariosRoute)
app.use('/api', destinosRoute)
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})