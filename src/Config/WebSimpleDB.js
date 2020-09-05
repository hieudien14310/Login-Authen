const mongoose = require('mongoose')

async function ConnectDB(params) {
    try {
        await mongoose.connect("mongodb://localhost/WebSimple", {
            useNewUrlParser: true,
            useUnifiedTopology: true,   
            useCreateIndex: true,
        })
        console.log("✅ Connecting to DB is successful");
    } catch (error) {
        console.log("To failure to connect DB");
    }
}
module.exports = {
    ConnectDB
}