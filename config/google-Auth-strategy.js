const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../modules/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Function to bcrypt a password
let saltRounds = 10;
function bcryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          console.error('Error generating salt: ', err);
          reject(err);
        } else {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
              console.error('Error while hashing password:', err);
              reject(err);
            } else {
              resolve(hash);
            }
          });
        }
      });
    });
  }

// setting google Auth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done)=>{
        try{

            let userEmail = profile.emails[0].value;
            
            const user = await User.findOne({email:userEmail});
            // return user if already registered 
            if(user){
                return done(null,user);
            }

            // bcrypt the password
            let cryptoPassword = crypto.randomBytes(20).toString('hex');
            const password = await bcryptPassword(cryptoPassword);
            
            // create new user
            const newUser = new User({
                fullName: profile.displayName,
                email: userEmail,
                gender: 'NotToSay',
                phone: '',
                image: profile.photos[0].value,
                address:'',
                password: password
            });
            // save user
            await newUser.save();
            return done(null,newUser);
            
        }catch(err){
            done(err);
            return;
        }
    }
));

module.exports = passport;