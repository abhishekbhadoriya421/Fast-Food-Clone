const db =  require('mongoose');

// User Schema 
const userSchema = new db.Schema({
    fullName:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum: ['Male', 'Female','Other','NotToSay']
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number
    },
    friends:{
        type:Array,
    },
    image:{
        type:String, 
    },
    address:{
        type:String
    }
    ,
    favoriteMeal: {
        type: Array,
    },
    myOrder: {
        type: Array,
    }
},{
    timestamps:true
});

const User = db.model('User',userSchema);

module.exports = User;