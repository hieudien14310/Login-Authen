const User = require('../Models/User')


const getIndex = (req,res,next) => {
    return res.render("Register");
}
const registerUser = async (req,res,next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        authenType: "local"
    })
    await user.save();
    return res.redirect('/home')
}

module.exports = {
    getIndex, registerUser
}