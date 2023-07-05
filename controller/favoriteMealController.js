const Meal = require('../modules/Meal');

// getting meal data
let getMeal = async(mealId)=>{
    return await Meal.findOne({mealId:mealId});
}

module.exports.favoriteMeals = async function(req,res){
    let FavMealId = req.user.favoriteMeal;
    if(FavMealId.length===0){
        return res.render('favoriteMeal',{
            favoriteMeals : undefined
        })
    }
    // Resolving All the promises
    const favoriteMeals = await Promise.all(FavMealId.map(getMeal));
    return res.render('favoriteMeal',{
        favoriteMeals,
    })
}

module.exports.myFavorite = async (req,res)=>{
    let mealId = req.query.id;

    // if Meal Id is already present in favorite meal remove it 
    if(req.user.favoriteMeal.includes(mealId)){
        const newFavoriteArray = req.user.favoriteMeal.filter(ele=>{
            return ele!== mealId;
        });
        req.user.favoriteMeal = newFavoriteArray;
    }else{ // if meal not present in favorite list then push mealId into favoriteMeal 
        req.user.favoriteMeal.push(mealId);
    }
    await req.user.save();
    
    return res.redirect('back');
}