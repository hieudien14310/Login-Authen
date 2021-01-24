const User = require('../Models/User')


const getIndex = (req,res,next) => {
    return res.render("Register", {
        title: "Register",
        user: null,
        messages: req.flash("errors")
    });
}
const registerUser = async (req,res,next) => {
    const {email, password} = req.body
    const checkEmailExist = await User.find({email});
    if(checkEmailExist.length >= 0){
        req.flash("errors", "❌ Email already exists!!!");
        return res.redirect('Register');
    }
    if(req.body.password !== req.body.confirmPassword){
        req.flash("errors", "❌ Confirm password do not match")
        return res.redirect('Register')
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