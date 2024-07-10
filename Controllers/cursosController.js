import Curso from '../Models/Curso.js';
import Usuario from '../Models/Usuario.js';

const crearCurso = async (req, res) => {
   
    const usuarioId = req.session.userId;

    const datosCurso = {
        ...req.body,
        usuarioId // Añade el usuarioId al objeto del curso
    };

    const curso = new Curso(datosCurso);

    try {
        // almacenar el curso
        await curso.save();
        res.redirect('/cursos');
        //res.json({mensaje: 'Curso creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Hubo un error', error: error.message});
    }
};
const mostrarCursosPorIdDelUsuario = async(req, res) => {
    const idUsuario = req.params.id;

    try {
        const cursos = await Curso.findAll({ where: { usuarioId: idUsuario } });
        if (cursos.length === 0) {
            return res.status(404).json({mensaje: 'No se encontraron cursos para este usuario'});
        } else {
            res.json(cursos);
        }

    } catch (error) {
        console.error("Error al obtener los cursos:", error.message);
        res.status(500).json({mensaje: 'Hubo un error', error: error.message});
    }
}
const eliminarCurso = async(req, res) =>{
    const idCurso = req.params.id;
    try {
        const curso = await Curso.findByPk(idCurso);
        if (!curso) {
            return res.status(404).send('El curso no existe');
        }
        await curso.destroy();
        res.redirect('/cursos');
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Hubo un error', error: error.message});
    }
}
const actualizarCurso = async(req, res) => {
    const idCurso = req.params.id;
    const { titulo, descripcion, url_imagen,url_video, url_formulario, url_pdf} = req.body;

    // Validación básica de los campos requeridos
    if (!titulo || !descripcion || !url_imagen ||!url_video || !url_formulario || !url_pdf) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    try {
        const curso = await Curso.findByPk(idCurso);
        if (!curso) {
            return res.status(404).send('El curso no existe');
        }

        // Actualización del curso con los datos validados
        await curso.update({
            titulo,
            descripcion,
            url_imagen,
            url_video,
            url_formulario,
            url_pdf,
        });

        res.redirect('/cursos');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error', error: error.message });
    }
}

export default{
    crearCurso,
    mostrarCursosPorIdDelUsuario,
    eliminarCurso,
    actualizarCurso
}