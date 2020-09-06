const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const facebookStrategy = require('passport-facebook').Strategy
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
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
      try {
        const user = await User.findOne({ email: email });
        if (!user) return done(null, false)
        const checkCorrectPassword = await user.comparePassword(password);
        if(!checkCorrectPassword) return done(null,false)
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//Sign in with Facebook
passport.use(new facebookStrategy({
  clientID: "833739360498315",
  clientSecret: "1f1fcb09ebdb14afd28727d98eab0b8e",
  callbackURL: "http://localhost:3001/login/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email','name', 'gender']
},
async function(accessToken, refreshToken, profile, done) {
  try {
    const findUser = await User.findOne({
      email:profile.emails[0].value,
      authenType: profile.provider
    })
    if(findUser) return done(null,findUser)
    const newUser = new User({
      email: profile.emails[0].value,
      authenType:profile.provider,
      firstName: profile.name.familyName,
      lastName: profile.name.givenName,
      urlImage: profile.photos[0].value
    })
    await newUser.save();
    done(null, newUser)
  } catch (error) {
    done(error,false)
  }
}
));

// Sign in with Google
passport.use(new googleStrategy({
  clientID: "17328609040-96fno1p6hrg8gvenfv43r5j75tefihlf.apps.googleusercontent.com",
  clientSecret: "Ov765mJ34-bslDXQYVxie2CX",
  callbackURL: "http://localhost:3001/login/auth/google/callback",
  passReqToCallback: true
},async (req, accessToken, refreshToken, profile, done) => {
  try {
    const findUser = await User.findOne({
      email: profile.emails[0].value,
      authenType: profile.provider
    })
    if(findUser) return done(null, findUser)
    const newUser = new User({
      email: profile.emails[0].value,
      authenType: profile.provider,
      firstName: profile.name.familyName,
      lastName: profile.name.givenName,
      urlImage: profile.photos[0].value
    })
    await newUser.save()
    done(null, newUser)
  } catch (error) {
    done(error, false)
  }
}))
