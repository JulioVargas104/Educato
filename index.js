import express from 'express';
import flash from 'connect-flash';
import router from './router/index.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url'; // Paso 1: Importar fileURLToPath
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import passport from './config/passport.js';
import db from './config/db.js';
import './Models/Usuario.js';
import './Models/Curso.js';
db.sync()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error));
// Definir __dirname para módulos ES
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear el Servidor
const app = express();

// Session configuration
app.use(session({
    secret: 'tu_secreto', // Replace 'yourSecretKey' with a real secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
  }));
// Initialize connect-flash
app.use(flash());

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

// inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de la app
app.use('/', router());

// Puerto de la App
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});