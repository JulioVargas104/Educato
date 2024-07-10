import express from 'express';
import homeController from '../Controllers/FrontEnd/homeController.js';
import UsuarioController from '../Controllers/UsuarioController.js';
const router = express.Router();

router.get('/',
    homeController.home
); 
router.get('/about',
    homeController.about
)
router.get('/courser',
    homeController.courser
)
router.get('/contact',
    homeController.contact
)

router.get('/login',
    UsuarioController.formIniciarSesion
)
export default () => router;