const passport = require("passport");
const Instagram = require("passport-instagram")
const InstagramStrategy = Instagram.Strategy;
require("dotenv").config();

passport.serializeUser((user, done) => { done(null, user) })
passport.deserializeUser((user, done) => { done(null, user) })

passport.use(new InstagramStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, profile);
}));

module.exports = passport;

