const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a SQL Server
const config = {
    user: 'Gabriel',
    password: 'luis9405cc',
    server: 'localhost', // Cambiar aquí al nombre del servidor SQL Server, ejemplo: 'localhost' o '192.168.1.5'
    database: 'QuizApp',
    options: {
        encrypt: true, // Establecer a true si es necesario, como en conexiones Azure SQL
        trustServerCertificate: true // Esto es útil en desarrollo si usas certificados autofirmados
    }
};

// Función para iniciar la conexión y manejar errores
async function startServer() {
    try {
        // Conectar a SQL Server
        await sql.connect(config);
        console.log("Conectado a SQL Server exitosamente");

        // Ruta para obtener todas las preguntas
        app.get('/questions', async (req, res) => {
            try {
                const result = await sql.query('SELECT * FROM Questions');
                res.json(result.recordset);
            } catch (err) {
                console.error('Error en el endpoint /questions:', err);
                res.status(500).send(err.message);
            }
        });

        const PORT = 3001;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("Error de conexión a SQL Server:", err);
    }
}

startServer();
