import Curso from '../../Models/Curso.js';
const intranet = (req, res) => {
    res.render('Intranet/intranet', { isPublic: false });
}
const coursos = async (req, res) => {
    try {

        const userId = req.session.userId;
        const cursosDelUsuario = await Curso.findAll({ where: { usuarioId: userId } });
        
        // Pasar los cursos a la vista
        res.render('Intranet/cursos', { isPublic: false, cursos: cursosDelUsuario });
    } catch (error) {
        console.error("Error al obtener los cursos del usuario:", error);
        res.status(500).send("Error al obtener los cursos");
    }
}
const crearCurso = (req, res) => {
    res.render('Intranet/crearCursos', { isPublic: false });
}
const actualizarCurso = async(req, res) =>{
    try {
        const idCurso = req.params.id;
        const curso = await Curso.findByPk(idCurso);
        if (!curso) {
            return res.status(404).send('El curso no existe');
        }
        res.render('Intranet/updateCursos', { isPublic: false, curso: curso });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el curso');
    }
}

export default {  
    intranet,
    coursos,
    crearCurso,
    actualizarCurso
}