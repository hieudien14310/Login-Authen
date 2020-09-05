const router = require('express-promise-router')()
const logoutController = require('../Controllers/Logout')
const {validateBodyRequest, schemas} = require('../helper/validate')


router.route('/')
    .get(logoutController.logoutUser)
module.exports = router