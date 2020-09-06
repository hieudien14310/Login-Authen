const User = require('../Models/User')
const getIndex = (req,res,next) => {
    console.log(req);
    if(req.user) return res.redirect('/home')
    res.render("Login", {
        title: "Login",
        user: null
    })
}
const postLogin = (req,res,next) => {
    const {email,password} = req.user
    let findUserExists = User.findOne({email: email})
    if(!findUserExists) return res.status(200).json({message: "Email not found"})
    return res.redirect('/login')
}
const authFacebook = (req,res,next) => {
    console.log("Facebook",req.user);
    res.redirect('/home')
}
module.exports = {
    getIndex, postLogin, authFacebook
}