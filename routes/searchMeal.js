const searchMealResultController = require('../controller/searchMealResultController');
const favoriteMealsController = require('../controller/favoriteMealController');
const route = require('express').Router();
const passport =  require('passport');

route.get('/favoriteMeal',passport.checkAuthentication,favoriteMealsController.favoriteMeals);
route.get('/myFavorite',passport.checkAuthentication,favoriteMealsController.myFavorite);
route.get('/Result',searchMealResultController.searchMealResult);

module.exports=route;