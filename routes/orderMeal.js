const route = require('express').Router();
const orderMeal = require('../controller/orderMealController');
const passport =  require('passport');
// get Route 
route.get('/orderMealPage',passport.checkAuthentication,orderMeal.orderMealPage)
route.get('/myOrders',passport.checkAuthentication,orderMeal.myOrders);

// Post Route
route.post('/placeOrder',passport.checkAuthentication,orderMeal.placeOrder);

module.exports = route;