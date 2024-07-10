import Curso from "../../Models/Curso.js";

const home = async (req, res) => {
    const cursos = await Curso.findAll();

    res.render('public/index', { isPublic: true, cursos: cursos});
}
const about = (req, res) => {
    res.render('public/about', { isPublic: true });
}
const courser = async (req, res) => {
    const limit = 10; // Número de cursos por página
    const page = parseInt(req.query.page) || 1; // Obtiene la página actual desde la URL o establece 1 por defecto
    const offset = (page - 1) * limit;

    try {
        // Obtiene el total de cursos
        const totalItems = await Curso.count();
        const totalPages = Math.ceil(totalItems / limit);

        // Obtiene los cursos para la página actual
        const cursos = await Curso.findAll({
            limit: limit,
            offset: offset
        });

        // Renderiza la vista con los cursos y la información de paginación
        res.render('public/courses', {
            isPublic: true,
            cursos: cursos,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los cursos');
    }
}
const cursoDetallado = async (req, res) =>{
    const idCurso = req.params.id;
    try {
        const curso = await Curso.findByPk(idCurso);
        if (!curso) {
            return res.status(404).send('El curso no existe');
        }
        res.render('public/courses-details', { isPublic: true, curso: curso  });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el curso');
    }
    
}

const contact = (req, res) =>{
    
    res.render('public/contact', { isPublic: true })
}

export default{
    home,
    about,
    courser,
    contact,
    cursoDetallado
};