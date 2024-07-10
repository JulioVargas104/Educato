import express from 'express';
import homeController from '../Controllers/FrontEnd/homeController.js';
import usuarioController from '../Controllers/UsuarioController.js';
import intranetController from '../Controllers/FrontEnd/intranetController.js';
import authController from '../Controllers/authController.js';
import cursosController from '../Controllers/cursosController.js';
const router = express.Router();

/* Vista Publica */
router.get('/',
    homeController.home
); 
router.get('/about',
    homeController.about
)
router.get('/courser',
    homeController.courser
)
router.get('/courser-detallados/:id',
    homeController.cursoDetallado
)
router.get('/contact',
    homeController.contact
)

router.get('/login',
    usuarioController.formIniciarSesion
)
router.post('/login',
    authController.autenticarUsuario
)

/* Vista Privada */
router.get('/cerrar-sesion',
    authController.usuarioAutenticado,
    authController.cerrarSesion
)

router.get('/intranet',
    authController.usuarioAutenticado,
    intranetController.intranet 
)
router.get('/cursos',
    authController.usuarioAutenticado,
    intranetController.coursos
)
router.get('/curso/:id',
    // authController.usuarioAutenticado,
    cursosController.mostrarCursosPorIdDelUsuario
)
router.get('/crear-curso',
    authController.usuarioAutenticado,
    intranetController.crearCurso
)
router.post('/crear-curso',
    // authController.usuarioAutenticado,
    cursosController.crearCurso
)
router.post('/eliminar-curso/:id',
    // authController.usuarioAutenticado,
    cursosController.eliminarCurso
)

router.get('/actualizar-curso/:id',
    authController.usuarioAutenticado,
    intranetController.actualizarCurso
)
router.post('/actualizar-curso/:id',
    // authController.usuarioAutenticado,
    cursosController.actualizarCurso
)

router.get('/mostrar-usuario',
    usuarioController.mostrarUsuarios
)
router.post('/crear-usuario',
    usuarioController.crearUsuario
)


export default () => router;