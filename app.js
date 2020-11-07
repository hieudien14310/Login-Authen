require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const flash = require('connect-flash')
const db = require("./src/Config/WebSimpleDB");
const User = require("./src/Models/User");
const registerRouter = require("./src/Router/RegisterRouter");
const loginRouter = require('./src/Router/LoginRouter')
const logoutRouter = require('./src/Router/LogoutRouter')
const session = require('express-session')
const passport = require('passport')
const shared = require('./internal/sub-const/const');

/// Config app
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// Config session of passport to keep req.user data
app.use(session({
  secret: 'keyboard cat',
  // cookie: {maxAge: 60000},
  resave: true,
  saveUninitialized: true,
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views", "components"));
// Static file
app.use(express.static("public"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/css", express.static(__dirname + "/public/css"));

// Connect to DB
db.ConnectDB();

//Routes
app.use("/register", registerRouter);
app.use('/login', loginRouter)
app.use('/logout',logoutRouter)

app.get("/home", (req, res, next) => {
  if(req.user){
    // req.flash("errors","🎉 Congratulations, successfully logged in  ")
    res.render("Home", {
      user: req.user,
      title : "Home",
      messages: req.flash("success")
    });
  } else {
    req.flash("errors", "❌ Please log in")
    res.redirect('/login')
  }
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Port is running on http://localhost:${process.env.PORT}/home ✅`);
});
