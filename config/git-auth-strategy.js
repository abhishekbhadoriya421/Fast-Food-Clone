const passport = require('passport');
const GitStrategy = require('passport-github');
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
passport.use( new GitStrategy({
        clientID: process.env.GIT_CLIENT_ID,
        clientSecret: process.env.GIT_CLIENT_SECRET,
        callbackURL: process.env.GIT_REDIRECT_URI,
    },
    async function(accessToken,refreshToken,profile,done){
       try{
            // check if user exist or not 
            const user = await User.findOne({email:profile.username});

            if(!user){
                
                // bcrypt the password
                let cryptoPassword = crypto.randomBytes(20).toString('hex');
                const password = await bcryptPassword(cryptoPassword);
                const newUser = new User({
                    fullName: profile.displayName,
                    email: profile.username,
                    gender: 'NotToSay',
                    phone: '',
                    image: profile.photos[0].value,
                    address:'',
                    password: password    
                });
                await newUser.save();
                return done(null,newUser);
            }else{
                return done(null,user);
            }
       }
       catch(err){
            done(err);
            return;
       }
    }
))

module.exports = passport;