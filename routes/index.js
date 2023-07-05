const Router = require('express').Router();
const homeController = require('../controller/homeController');
const searchMeal = require('./searchMeal');
const mealDetail = require('./mealDetail');
const profile = require('./profilePage');
const orderMeal = require('./orderMeal');
const User = require('./user');


// get Route
Router.get('/',homeController.home);
Router.use('/searchMeal', searchMeal);
Router.use('/detail',mealDetail);
Router.use('/profile', profile);
Router.use('/user',User);
Router.use('/orderMeal',orderMeal)

module.exports = Router;