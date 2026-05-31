import sql from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const stringConnection = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        trustServerCertificate: true
    }
}

const poolConnection = new sql.ConnectionPool(stringConnection)
.connect()
.then(pool => {
    console.log('Conexión a la base de datos establecida');
    return pool;
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
});

export {sql, poolConnection};