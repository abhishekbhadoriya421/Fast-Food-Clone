const mealCategory = document.getElementById('mealCategory');
const meal_by_country = document.getElementById('meal-by-country');
const FilterMealBtn = document.getElementById('FilterMealBtn');
const ResultContainer = document.querySelector('.search-Result-container');

function PrintMeal(data){
    data.meals.forEach(meal => {
        ResultContainer.innerHTML += `
        <a href="/detail/mealDetail/${meal.idMeal}" class="Meal">
                <div class="Meal-image">
                    <img src=${meal.strMealThumb} alt="loading">
                </div>
                <div class="Meal-details">
                    <p class="Meal-name">${meal.strMeal}</p>
                    <p class="Meal-category">${meal.strCategory}</p>
                    <p class="Rating">4.5*</p>
                </div>
                <div class="priceAndBuy">
                    <p class="price"><span style="color:#499729d1;"><i class="fa-solid fa-indian-rupee-sign"></i>1234</p>
                    <button type="submit" id="buy-btn">add</button>
                </div>
            </a>
        `
    });
}

// Search By Category
function searchMealByCategory(target){
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.onload  = function(){
        const jsonRequest = JSON.parse(xmlRequest.response);
        PrintMeal(jsonRequest);
    }
    xmlRequest.open('get',`https://www.themealdb.com/api/json/v1/1/search.php?s=${target}`);
    xmlRequest.send();
}

// Search By country
function searchMealByCountry(target){
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.onload  = function(){
        const jsonRequest = JSON.parse(xmlRequest.response);
        PrintMeal(jsonRequest);
    }
    xmlRequest.open('get',`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target}`);
    xmlRequest.send();
}

// Finding meal using
function findMeal(Category, Country){
    console.log(Category,Country)
    if(Category.length>0){
        searchMealByCategory(Category);
    }

    if(Country.length>0){
        searchMealByCountry(Country);
    }
}

// Click Event on Filter btn
FilterMealBtn.addEventListener('click',()=>{
    ResultContainer.innerHTML = "";
    const mealCategoryValue = mealCategory.value;
    const mealByCountryValue = meal_by_country.value;
    findMeal(mealCategoryValue,mealByCountryValue);
})