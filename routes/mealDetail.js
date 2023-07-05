const route = require('express').Router();
const multer = require('multer');
const detailMealController = require('../controller/mealDetailPageController');
const passport = require('passport');
const upload = multer();
// Set Route 
route.get('/mealDetail/:id',detailMealController.getMealDetail);

// Like Route
route.get('/Like',passport.checkAuthentication,detailMealController.Like);
// Post Route
route.post('/comment',passport.checkAuthentication,upload.none(),detailMealController.comment);

module.exports=route;