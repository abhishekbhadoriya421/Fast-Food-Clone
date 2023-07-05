// Controller to render the meal Detail Page
const Meal = require("../modules/Meal");
const Comment = require("../modules/Comment");
const Like = require("../modules/Like");
let fetch;

module.exports.getMealDetail = async (req, res) => {
  try {
    // Checking if meal Is Present in Meal Schema or not
    const meal = await Meal.findOne({ mealId: req.params.id });

    // if Meal is not found then return the add the meal into meal schema
    if (!meal) {
      //importing node-fetch library dynamically
      const node_fetch = await import("node-fetch");
      fetch = node_fetch.default;

      // getting Response and converting into json
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`
      );
      const data = await response.json();

      let setPrice = Math.floor(Math.random() * 1000) + 400;
      const newMeal = new Meal({
        mealId: data.meals[0].idMeal,
        mealName: data.meals[0].strMeal,
        mealCategory: data.meals[0].strCategory,
        mealArea: data.meals[0].strArea,
        mealVideoLink: data.meals[0].strYoutube,
        mealInstruction: data.meals[0].strInstructions,
        mealPrice: setPrice,
        mealImage: data.meals[0].strMealThumb,
        mealFavoriteCount: 0,
        mealComments: [],
        mealLikes: [],
      });

      let meal = await newMeal.save();
      res.render("detail/mealDetail.ejs", {
        meals: meal,
        favoriteMeal: false,
      });
    } else {
      
      if (req.user && req.user.favoriteMeal.includes(meal.mealId)) {
        return res.render("detail/mealDetail.ejs", {
          meals: meal,
          favoriteMeal: true,
        });
      } else {
        return res.render("detail/mealDetail.ejs", {
          meals: meal,
          favoriteMeal: false,
        });
      }
    }
  } catch (err) {
    res.redirect('back');
  }
};

// comment on Meal
module.exports.comment = async (req, res) => {
  try {
    // pushing all the necessary details
    let details = req.body;
    details.userId = req.user.id;
    details.userEmail = req.user.email;
    // saving Comments DataBase
    let comment = new Comment(details);
    let newComment = await comment.save();
    // We also Update the Meal Comment array
    let meal = await Meal.findOne({ mealId: details.mealId });
    meal.mealComments.push({
      commentId: newComment.id,
      content: newComment.content,
      userEmail: newComment.userEmail,
      userId: details.userId,
    });
    // Saving the comment
    await meal.save();

    return res.status(200).redirect('back');
  } catch (err) {
    return res.status(500).redirect('back');
  }
};

// Like
module.exports.Like = async (req, res) => {
  try {
    let id = req.query.id;
    // check if user has liked or not
    let userLiked = await Like.findOne({user: req.user.id});
    if(userLiked){
        // remove Like
        await Like.findByIdAndDelete(userLiked.id);
       //remove like from meal
        const meal = await Meal.findById(id);
        meal.mealLikes.pull(req.user.id);
        await meal.save(); 
    }else{
        // add the like
        let like = new Like({
            user: req.user.id,
            likeable: id,
        });
        await like.save(); 
        const meal = await Meal.findById(id);
        meal.mealLikes.push(req.user.id);
        await meal.save();
    }

    return res.status(200).redirect('back');
    
  } catch (err) {
    return res.redirect('back');
  }
};
