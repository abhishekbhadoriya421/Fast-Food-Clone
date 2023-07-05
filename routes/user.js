const route = require('express').Router();
const sessionController = require('../controller/sessionController.js');
const passport = require('passport');
// get Request
route.get('/signIn',sessionController.signInPageController);
route.get('/signUp',sessionController.signUpPageController);
route.get('/destroySession',sessionController.destroySession);
route.get('/forgetPasswordPage',sessionController.forgetPasswordPage);
// Post Request 
route.post('/create',sessionController.create);
route.post('/createUserOTP',sessionController.createUserOTP);

route.post('/createSession',passport.authenticate(
    'local',
    {
        failureRedirect: 'back',
        failureFlash: 'Wrong Email or password' // Set the flash message for failure
    }
),sessionController.createSession);


route.post('/forgetPassword',sessionController.forgetPassword);
route.post('/OTP',sessionController.checkOTP);
route.post('/changePassword',sessionController.changePassword);

// Google Authentication
route.get('/auth/google',passport.authenticate(
    'google',
    {
        scope: ['profile', 'email']
    }
));

// google call back url
route.get('/auth/google/callback',passport.authenticate(
    'google',
        {failureRedirect:'/'}
    ),
    sessionController.createSession 
)


// Facebook Authentication
route.get('/auth/facebook',passport.authenticate(
    'facebook',
    {
        scope: ['profile', 'email']
    }
));

// Facebook call back url
route.get('/auth/facebook/callback',passport.authenticate(
    'facebook',
        {failureRedirect:'/'}
    ),
    sessionController.createSession 
)

// GITHUB Authentication
route.get('/auth/github',passport.authenticate('github',));

// git callback url

route.get('/auth/github/callback',passport.authenticate(
    'github',
        {failureRedirect:'/'}
    ),
    sessionController.createSession 
)
module.exports=route;