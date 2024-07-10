import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Usuario from '../Models/Usuario.js';

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password'
    },
    async (correo, password, done) => {
        try {
            const usuario = await Usuario.findOne({ where: { correo } });

            if (!usuario) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            const verificarPass = await usuario.validarPassword(password);

            if (!verificarPass) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findByPk(id);
        done(null, usuario);
    } catch (error) {
        done(error);
    }
});

export default passport;
