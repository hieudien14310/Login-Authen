

const logoutUser = (req,res,next) => {
    req.logout()
    req.session.destroy((error) => {
        if(error) console.log("Error: Failed to destroy the session");
        req.user = null;
        res.redirect('/login')
    })
}

module.exports = {
    logoutUser
}