const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../modules/User');
const crypto = require('crypto');

// setting Facebook Authentication
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_REDIRECT_URI
},
 async function(accessToken, refreshToken, profile, done) {
    try{
        let userEmail = profile.emails[0].value;
        
        const user = await User.findOne({email:userEmail});
        // return user if already registered 
        if(user){
            return done(null,user);
        }

        // create new user
        const newUser = new User({
            fullName: profile.displayName,
            email: userEmail,
            gender: 'NotToSay',
            phone: '',
            image: profile.photos[0].value,
            address:'',
            password: crypto.randomBytes(20).toString('hex')
        });
        // save user
        await newUser.save();
        return done(null,newUser);
        
    }catch(err){
        done(err);
        return;
    }
}
))

module.exports = passport;