const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../Models/User");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Do passport-local lÀ third-party của passport nên phải khai báo cho passport là sử dụng passport-local
//Passport local
passport.use(
  new localStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
        console.log(1);
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("Sai user");
            return done(null, false);
        }
        if (user.password !== password) {
            return done(null, false);
        }
        done(null, user);
        // const checkCorrectPassword = await user.isValidPassword(passport);
        // if(!checkCorrectPassword) return done(null,false)
      } catch (error) {
        done(error, false);
      }
    }
  )
);
