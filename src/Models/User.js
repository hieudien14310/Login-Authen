const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    password: {
        type: String
    },
    email: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User