const User = require('../Models/User')


const getIndex = (req,res,next) => {
    return res.render("Register", {
        title: "Register",
        user: null
    });
}
const registerUser = async (req,res,next) => {
    if(req.body.password !== req.body.confirmPassword){
        return res.status(200).json({Error: "Confirm password mismatched"})
    }
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