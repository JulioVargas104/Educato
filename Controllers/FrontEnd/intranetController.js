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
export default {  
    intranet,
    coursos,
    crearCurso
}