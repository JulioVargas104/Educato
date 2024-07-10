import express from 'express';
import router from './router/index.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url'; // Paso 1: Importar fileURLToPath
import expressLayouts from 'express-ejs-layouts';
import db from './config/db.js';
import './Models/Usuario.js';
db.sync()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error));
// Definir __dirname para módulos ES
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear el Servidor
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar EJS como template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Ubicación de las vistas
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
// Archivos estáticos
app.use(express.static('public'));
// Rutas de la app
app.use('/', router());

// Puerto de la App
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});