const passport =  require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../modules/User');

// Setting Local Authentication
passport.use(new LocalStrategy({
    usernameField: 'email', // set usernameField to email, it's necessary if using email or other thing to be authenticate
    password : 'password',
},
async function(email,password,done){
    try{
        const user = await User.findOne({email:email});
        // if user and password is not found or matched the user is not authenticate
        if(!user){
            return done(null,false);
        }
        let isPassword = await bcrypt.compare(password,user.password);
        // console.log(isPassword);
        if(!isPassword){
            return done(null,false);
        }
        // if user is found and password is matched the user is authenticate
       return done(null,user);
    }
    catch(err){
       return done(err,false);
    }
}
));

// serialize User id as unique key for check authentication and stored in cookie
passport.serializeUser(function(user,done){
    return done(null,user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
       return done(null,user);
    }catch(err){
       return done(err,false);
    }
})

// Check Authentication Middleware
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }  
    return res.redirect('/user/signIn');
}

// set Authentication Middleware
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
   return next();
}