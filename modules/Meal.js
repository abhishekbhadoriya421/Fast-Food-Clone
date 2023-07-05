const db = require('mongoose');

const MealSchema = db.Schema({
    mealId : {
        type : Number,
        required : true 
    },
    mealName : {
        type : String,
        required : true
    },
    mealInstruction : {
        type : String,
        required : true
    },
    mealCategory : {
        type : String,
        required : true,
    },
    mealArea : {
        type : String,
        required : true,
    },
    mealPrice : {
        type : Number,
        required : true,
    },
    mealImage : {
        type : String,
        required : true,
    },
    mealFavoriteCount : {
        type : Number,
        required : true,
    },
    mealVideoLink : {
        type : String,
    },
    mealComments : {
        type : Array,
        required : true,
    },
    mealLikes :[ {
        type : db.Schema.Types.ObjectId,
        ref : 'Like'
    }]
})

const Meal = db.model('Meal',MealSchema);

module.exports = Meal;