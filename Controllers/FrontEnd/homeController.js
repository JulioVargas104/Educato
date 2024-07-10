const home = (req, res) => {
    res.render('public/index', { isPublic: true });
}
const about = (req, res) => {
    res.render('public/about', { isPublic: true });
}
const courser = (req, res) =>{
    res.render('public/courses', { isPublic: true });
}
const contact = (req, res) =>{
    res.render('public/contact', { isPublic: true })
}

export default{
    home,
    about,
    courser,
    contact
};