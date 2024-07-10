import passport from 'passport';

const autenticarUsuario = (req, res, next) => {
    passport.authenticate('local', (err, usuario, info) => {
        if (err) {
            return next(err);
        }
        if (!usuario) {
            req.flash('error_msg', 'Credenciales no válidas');
            console.log(`Credenciales no válidas: ${req.body.correo}`);
            return res.redirect('/login');
        }
        req.logIn(usuario, (err) => {
            if (err) {
                return next(err);
            }
            // Guardar el ID del usuario en la sesión
            req.session.userId = usuario.id; // Asegúrate de que el objeto usuario tenga un campo id
            console.log(`Usuario autenticado exitosamente: ${usuario.correo}`);
            return res.redirect('/intranet');
        });
    })(req, res, next);
};

const usuarioAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Por favor, inicie sesión para acceder a esta página.');
    return res.redirect('/login');
};
const cerrarSesion = (req, res) => {
    req.logout(req.user, err =>{
        if(err) return next(err)
    });
    req.flash('correcto', 'Cerraste sesión correctamente');
    return res.redirect('/login');
};

export default {
    autenticarUsuario,
    usuarioAutenticado,
    cerrarSesion
};
