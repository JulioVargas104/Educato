
const formIniciarSesion = (req, res) => {
    res.render('Intranet/login', { isPublic: false });
}

export default {
    formIniciarSesion
}