const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()
const registerController = require('../Controllers/Register')
const {validateBodyRequestRegister, schemas} = require('../helper/validate')


router.route('/')
    .get(registerController.getIndex)
    .post(validateBodyRequestRegister(schemas.registerSchema),registerController.registerUser)
module.exports = router