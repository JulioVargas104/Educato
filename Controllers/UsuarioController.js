import Usuario from '../Models/Usuario.js';
import bcrypt from 'bcrypt';

const formIniciarSesion = (req, res) => {
    res.render('Intranet/login', { isPublic: false });
}
const crearUsuario =  async (req,res) =>{
    const usuario = new Usuario(req.body);
    try {
        // almacenar el usuario
        await usuario.save();
        res.json({mensaje: 'Usuario creado correctamente'});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({mensaje: 'El correo ya está registrado.'});
        }
        console.log(error);
        res.status(500).json({mensaje: 'Hubo un error', error: error.message});
    }
}
const mostrarUsuarios = async(req,res) =>{
    try{
        const usuario = await Usuario.findAll();
        res.json(usuario);   
    }catch(error){
        console.error("Error al obtener los usuarios:", error.message);
        res.status(500).json({mensaje: 'Hubo un error', error: error.message});
    }
}

export default {
    formIniciarSesion,
    crearUsuario,
    mostrarUsuarios
}