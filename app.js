const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const db = require("./src/Config/WebSimpleDB");
const User = require("./src/Models/User");
const registerRouter = require('./src/Router/RegisterRouter')
/// Config app
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views", "components"));
// Static file
app.use(express.static("public"));
app.use("/img", express.static(__dirname + "/public/img"));

// Connect to DB
db.ConnectDB();

//Routes
app.use('/register',registerRouter)

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.listen(3001, () => {
  console.log("✅ Port is running on http://localhost:3000 ✅");
});
