module.exports.searchMealResult = async(req,res)=>{
    try{
        const fetch_node = await import('node-fetch');
        let fetch = fetch_node.default;
        let mealResponse;
        if(req.query.type==="country"){
            mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${req.query.name}`);
        }else if(req.query.type==='name'){
            mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${req.query.name}`);
        }
        const meals = await mealResponse.json();

        if(meals.meals === null){
            return res.status(400).render('./mealSearchResult/searchResult.ejs',{
                resultType: req.query.name,
                meals: undefined
            });
        }
       
        return res.status(200).render('./mealSearchResult/searchResult.ejs',{
            meals:meals.meals,
            resultType: req.query.name
        });
    }
    catch(err){
        return res.redirect('back');
    }
}