// Acquiring necessary libraries, frameworks and middleware's 
require('dotenv').config(); 
const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();
const port = 8000;
// Acquiring DataBaseSchema
require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const GoogleStrategy = require('./config/google-Auth-strategy');
const FacebookStrategy = require('./config/facebook-strategy');
const GitStrategy = require('./config/git-auth-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
// flash message
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// Set up multer middleware for handling multipart/form-data
const upload = multer();
//  Setting SASS Middleware
// app.use(sassMiddleware({
//     src: './src/scss',
//     dest: './src/css',
//     debug: true,
//     outputStyle: 'expanded',
//     prefix: '/css'
// }));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// using Cookies middleware
app.use(cookieParser());

// setting Static File(js,css,etc)
app.use(express.static('src'));


// Setting View Engine
app.set('view engine','ejs');
app.set('views','./views');

// Create Session
app.use(session({
    name: 'FindMeal',
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:process.env.mongoUrl,
        autoRemove: 'disabled'
    },
        function(err){
           console.log(err || 'connected mongo-connect')
        }
    )
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Flash middleware
app.use(flash());
app.use(customMiddleware.setFlash);
app.use('/',require('./routes/index'));

// multer 
app.use(upload.any());

// Setting Routes
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('server is running on port 8000');
    }
})