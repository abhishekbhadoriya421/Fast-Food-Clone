const showMealCategory = document.getElementById('showMealCategory');
//   Print Meals On DOM
  function printMeals(MealName, MealId, MealImage,MealPrice = 100) {

    showMealCategory.innerHTML += `<a href="/detail/mealDetail/${MealId}" class="mealContainer" id=${MealId}>
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
    showMealCategory.innerHTML = ""; // First Make Previous Result To Null If have
    if(data.meals){
      for (let i = 0; i < data.meals.length; i++) {
        printMeals(
          data.meals[i].strMeal,
          data.meals[i].idMeal,
          data.meals[i].strMealThumb
        );
      }
    }else{
      return;
    }
  };

// Fetching Random Meal From Meal db API using Ajax
function findMeal(MealName){
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
    if(MealName){
      xmlRequest.send();
    }
    
}



  const allMeals = document.querySelectorAll('#MealCatagories p');
  let MoreMeal = document.getElementById('MoreMealBtn');

  // if we click on more meal the first pork will be visible
  MoreMeal.addEventListener('click',()=>{
    findMeal('Pork');
  })

  // show meal on click
  allMeals.forEach(meal=> {
      meal.addEventListener('click',()=>{
        findMeal(meal.getAttribute('value'));
        let previousSelectedMeal = document.getElementsByClassName('selectedMeal')[0];
        previousSelectedMeal.classList.remove('selectedMeal');
        meal.classList.add('selectedMeal');
      })
  });          