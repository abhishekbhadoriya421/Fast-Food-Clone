// Welcome Heading Animation
let searchHeading =  document.querySelector('.searchHeading');
let searchHeadingContent = ['Search Your Meal Here','Welcome To Fast Food'];

let windowWidth = window.innerWidth;
let compareWidth;
let searchHeadingWidth;
if(windowWidth > 700){
    compareWidth = '445px';
    searchHeadingWidth = '445px';
}else{
    compareWidth = '240px';
    searchHeadingWidth = '240px';
}

const stopAnimation = setInterval(()=>{

    if(searchHeadingWidth===compareWidth){
        searchHeading.style.width = '0px';
        searchHeadingWidth = '0px';
    }else{
        searchHeading.style.width = compareWidth;
        searchHeadingWidth = compareWidth;
        // Changing the Content EveryTime when is width is increasing 
        if(searchHeading.innerHTML === searchHeadingContent[0]){
            searchHeading.innerHTML = searchHeadingContent[1];
        }else{
            searchHeading.innerHTML = searchHeadingContent[0];
        }
    }
},2500);

const mealList_Section = document.getElementById('mealList-Section');
//   Print Meals On DOM
  function printMeals(MealName, MealId, MealImage,MealPrice = 100) {

    mealList_Section.innerHTML += `<a href="/detail/mealDetail/${MealId}" class="mealContainer" id=${MealId}>
            <div class="meal">
            <img
                src=${MealImage}
                alt="..."
                class="mealTheme"
                id=${MealId}
            />
            <p class="mealName" id=${MealId}>
            ${MealName} <span style="color:#499729d1;"><i class="fa-solid fa-indian-rupee-sign"></i>${MealPrice}</span>
            </p>
            </div>
        </a> `;
    return;
  }

  let helperFunction = (data) => {
    mealList_Section.innerHTML = ""; // First Make Previous Result To Null If have
    for (let i = 0; i < data.meals.length; i++) {
      printMeals(
        data.meals[i].strMeal,
        data.meals[i].idMeal,
        data.meals[i].strMealThumb
      );
    }
  };

// Fetching Random Meal From Meal db API using Ajax
function fetchingRandomMeal(MealName){
    // This create New instance of XMLHttpRequest
    const xmlRequest = new XMLHttpRequest();

    // This onload Method is called when response is successful
    xmlRequest.onload = function(){
        const jsonRequest = JSON.parse(xmlRequest.response);
        helperFunction(jsonRequest);
    }
    // the open Method take two parameters Method of API and second URL of API
    xmlRequest.open('get',`https://www.themealdb.com/api/json/v1/1/filter.php?c=${MealName}`);

    // send method send the http request on the specified url
    xmlRequest.send();
}

//  Random Meal Object
const Meal = {
    1 : "Beef",
    2 : "Chicken",
    3 : "Dessert",
    4 : "Lamb",
    5 : "Miscellaneous",
    6 : "Pasta",
    7 : "Pork",
    8 : "Seafood",
    9 : "Side",
    10 : "Starter",
    11 : "Vegan",
    12 : "Vegetarian",
    13 : "Breakfast",
}  

let randomNumber = Math.floor(Math.random() * 13) + 1;
fetchingRandomMeal(Meal[randomNumber]);

// Next Meal
let nextMeal = document.getElementById('nextMeal');

nextMeal.addEventListener('click',()=>{
    randomNumber = Math.floor(Math.random() * 13) + 1;
    fetchingRandomMeal(Meal[randomNumber]);
});
