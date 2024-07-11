import Usuario from '../Models/Usuario.js';
import bcrypt from 'bcrypt';

const formIniciarSesion = (req, res) => {
    res.render('Intranet/login', { isPublic: false });
}
const crearUsuario = async (req, res,next) => {
    // Verificar si las contraseñas coinciden
    if (req.body.password !== req.body.revisarPassword) {
        // Si no coinciden, enviar un mensaje de error
        res.render('Intranet/crearUsuario', { isPublic: false, mensaje: 'Las contraseñas no coinciden' })
        return next();
    }

    const usuario = new Usuario(req.body);
    try {
        // almacenar el usuario
        await usuario.save();
        res.redirect('/usuarios');
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.render('Intranet/crearUsuario',{ isPublic: false, mensaje: 'El correo ya está registrado.' });
        }
        console.log(error);
        res.render('Intranet/crearUsuario',{isPublic: false, mensaje: error.message });
        return next();
    }
};
const mostrarUsuarios = async(req,res) =>{
    try{
        const usuario = await Usuario.findAll();
        res.json(usuario);   
    }catch(error){
        console.error("Error al obtener los usuarios:", error.message);
        res.status(500).json({mensaje: 'Hubo un error', error: error.message});
    }
}
const eliminarUsuario = async(req,res) =>{
    try{
        const usuario = await Usuario.findByPk(req.params.id);
        await usuario.destroy();
        res.redirect('/usuarios');
    }catch(error){
        console.error("Error al eliminar el usuario:", error.message);
        res.status(500).json({mensaje: 'Hubo un error', error: error.message});
    }
}

export default {
    formIniciarSesion,
    crearUsuario,
    mostrarUsuarios,
    eliminarUsuario
}