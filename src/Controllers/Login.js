const User = require('../Models/User')
const getIndex = (req,res,next) => {
    return res.render("Login")
}
const postLogin = (req,res,next) => {
    const {email,password} = req.user
    let findUserExists = User.findOne({email: email})
    if(!findUserExists) return res.status(200).json({message: "Email not found"})
    return res.redirect('/home')
}

module.exports = {
    getIndex, postLogin
}