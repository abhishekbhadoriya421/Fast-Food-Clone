const MyOrder = require('../modules/myOrder');
const Meal =  require('../modules/Meal')
module.exports.orderMealPage = async(req,res)=>{
    try{
        let mealId =  req.query.id;
        let quantity = req.query.quantity
        
        const node_fetch = await import('node-fetch');
        fetch = node_fetch.default;
        // getting Response and converting into json
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        return res.render('buyMeal/paymentForm',{
            mealImage: data.meals[0].strMealThumb,
            mealName : data.meals[0].strMeal,
            mealPrice: 500,
            mealQuantity:quantity,
            mealId : mealId,
        });
    }
    catch(err){
        return res.redirect('back');
    }
   
}

// fetchMealDetails
async function fetchMealDetails(mealId){
    return Meal.findOne({mealId:mealId});
}

module.exports.myOrders = async (req,res)=>{
   
    let myOrder = await Promise.all(req.user.myOrder.map(async (order)=>{
        let newMealObj = new Object;
        let mealDetails = await fetchMealDetails(order.mealId);
        const {mealImage,mealName} = mealDetails;
        newMealObj = order;
        newMealObj.mealImage = mealImage;
        newMealObj.mealName = mealName;
        return newMealObj; 
    }))

    res.render('myorder/myOrderPage',{
        myOrder : myOrder
    });
}

// generate OrderId 
let generateOrderId = async()=>{
    let min = 10000000;
    let max = 99999999;

    let newOrderId = Math.floor(Math.random()* (max-min+1))+min;
    const order = await MyOrder.findOne({orderId:newOrderId});
    if(!order){
        return newOrderId;
    }
    // if the generateOrderId is matched with any PlacedOrderId then make a recursive call
    return generateOrderId();
} 

// Palaced User Order and saving the details in database
module.exports.placeOrder = async(req,res)=>{
    try{

        const orderDetails = req.body;
        orderDetails.userId = req.user.id;
    
        // Fetching OrderID Number
        orderDetails.orderId = await generateOrderId();
    
        // get the current date 
        orderDetails.date = new Date();
        // saving new Order
        const newOrder = new MyOrder(orderDetails);
        await newOrder.save();
        
        // Updating User MyOrder
        let myOrderData = {
            orderId : newOrder.orderId,
            date : newOrder.date,
            totalPrice : newOrder.totalPrice,
            mealId : newOrder.mealId,
            quantity : newOrder.quantity,
        }
        // Saving MyOrder Data in user myOrder Array
        req.user.myOrder.push(myOrderData);
        await req.user.save();
        return res.redirect('/orderMeal/myOrders');
    }
    catch(err){
        return res.redirect('back');
    }
}