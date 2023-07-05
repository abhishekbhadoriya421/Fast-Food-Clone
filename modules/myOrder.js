const db = require('mongoose');

const myOrderSchema =  db.Schema({
    // reference to Id From User Schema
    userId : {
        type : db.Schema.Types.ObjectId,
        ref : 'User'
    },
    mealId : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
    },
    totalPrice: {
        type :Number,
        required : true
    },
    orderId :{
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    fullName: {
        type: String, 
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        required : true
    },
    zip : {
        type : String,
        required : true
    },
    cardname : {
        type : String,
        required : true
    },
    cardnumber : {
        type : Number,
        required : true
    },
    cvv : {
        type : Number,
        required : true
        },
    expmonth : {
        type : Number,
        required : true
    },
    expyear : {
        type : Number,
        required : true
    },

},{
    timestamps: true
});

const MyOrder = db.model('MyOrder',myOrderSchema);

module.exports = MyOrder;