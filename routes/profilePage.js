const route = require('express').Router();
const multer = require('multer');
const ProfilePageController = require('../controller/profilePageController');
const passport = require('passport');
// Configure multer to specify the destination folder for uploaded files

// Set Route 
route.get('/user',passport.checkAuthentication,ProfilePageController.ProfilePage);
route.get('/userProfile',passport.checkAuthentication,ProfilePageController.userProfile);

route.get('/createfriend',passport.checkAuthentication,ProfilePageController.createFriend);


if(passport.checkAuthentication){
    let storage = multer.diskStorage({
        destination : (req,file,cb)=>{
            return cb(null,'src/uploads/');
        },
        filename: (req,file,cb)=>{
            return cb(null,`${Date.now()}-${file.originalname}`);
        }
    })
const upload = multer({storage});
// Post
route.post('/updateImage',upload.single('profilePic'),ProfilePageController.updateImage);
}
module.exports = route;