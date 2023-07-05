// fetching Html Elements
const inputBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("search-button");
const mealsContainer = document.getElementById("mealList-Section");
const FavoriteMealBtn = document.getElementById("FavoriteMealBtn");
const favoriteMealContainer = document.getElementById("favoriteMealContainer");
const closesFavBtn = document.getElementById("closesFavBtn");
const Aside_section = document.getElementById("Aside_section");
const suggestionContainer = document.querySelector('.suggestion-container');
const MealCatagories = document.querySelectorAll('#MealCatagories p');
const showMealCategory = document.getElementById('showMealCategory');
const mealCategoryContainer = document.querySelector('#showMealCategory .categoryMealContainer');
const closeMealCategory = document.getElementsByClassName('closeMealCategory')[0];

// Search Meal Functions Block

{
  // Print Meals On DOM
  function printMeals(MealName, MealId, MealImage) {
    let favIcon = "regular";
    if (localStorage.getItem(MealId) != null) {
      favIcon = "solid";
    }
    mealsContainer.innerHTML += ` <div class="mealContainer">
            <div class="meal">
            <img
                src=${MealImage}
                alt="..."
                class="mealTheme"
                id=${MealId}
            />
            <p class="mealName" id=${MealId}>
            ${MealName}<i class="fa-${favIcon} fa-heart fa-beat" style='color:#c00202;' id="Favorite" data-id="false"></i>
            </p>
            </div>
        </div> `;
    return;
  }

  // getting Meals In Meals Array
  function getMeals(data) {
    for (let i = 0; i < data.length; i++) {
      printMeals(
        data[i].strMeal,
        data[i].idMeal,
        data[i].strMealThumb
      );
    }
  }

  // printing message if meal is not found
  function mealNotFound(){
    mealsContainer.innerHTML = `<h1>Meal is not found :(</h1>`
  }

  // fetching All Meals by Category and Meal name
 function fetch_Meal(mealName) { // making async call
  mealsContainer.innerHTML = ""; // Clearing all Previous Html results if it have
    const url1 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    const url2 = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`;
    const url3 = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealName}`;

    Promise.allSettled([
        fetch(url1),
        fetch(url2),
        fetch(url3)
    ]).then((result)=>{
        let promises = new Array();
        promises[0] = result[0].value.json();
        promises[1] = result[1].value.json();
        promises[2] = result[2].value.json();
      return Promise.all(promises); //resolving and returning both the promises
    }).then((data)=>{
        for(let i=0;i<data.length;i++){
          if(data[i].meals!=null){
            getMeals(data[i].meals);
          }
        }
        if(data[0].meals==null && data[1].meals==null && data[2].meals==null){
          mealNotFound();
        }
    }).catch((err)=>{
     
    })
  }

  // Checkisng If the search box is not Null
  function is_Request_Valid() {
    if (inputBox.value === "") return false;
    else return true;
  }

  // Adding Event Listener On Search Button
  searchBtn.addEventListener("click", () => {
    suggestionContainer.style.display = 'none'; 
    if (is_Request_Valid()) {
      fetch_Meal(inputBox.value);
      inputBox.value = ""; //set the input value to Empty Again for new request
    } else alert("Please Enter Meal Name");
  });
}

// Suggestion of meals Section
{
  let typedKey = "" // it will contain input values
  
  // Check that the suggestion should display or not
    function suggestionDisplay(){
      if(typedKey.length==0){
        suggestionContainer.style.display = 'none';
      }
  
      if(typedKey.length>0){
        suggestionContainer.style.display = 'block';
      }
    }
  
    // Printing Suggestions creating new p tag element and appending into the suggestionContainer 
    function printSuggestions(mealName){
      let newEle = document.createElement('p');
      newEle.classList.add('suggestion');
      newEle.textContent = mealName;
      suggestionContainer.appendChild(newEle);
    }
  
    // Getting the API data
    function getSuggestion(meal){
      suggestionContainer.innerHTML = "";
      suggestionDisplay()
      for(let i=0;i<meal.length;i++){
        printSuggestions(meal[i].strMeal);
      }
      
    }
  
    // Fetching the data From API
    function  searchSuggestion(key){
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        getSuggestion(data.meals);
      }).catch((err)=>{
        console.log(err)
      }); 
    }
  
    // Adding Event Handler on inputBox
    inputBox.addEventListener('input',()=>{
      typedKey =  inputBox.value;
      searchSuggestion(typedKey);
    });
  
}


// Adding Meal To Favorite List
{
  let AddingFavorite = (MealId, targetElement) => {
    localStorage.setItem(MealId, MealId);
    targetElement.classList.remove("fa-regular");
    targetElement.classList.add("fa-solid");
    targetElement.style.color = "#c00202";
  };

  window.document.addEventListener("click", (event) => {
    if (event.target.getAttribute("id") == "Favorite") {
      // fetching Parent Node. so that i can get Meal Id
      let parentNode = event.target.parentNode;
      let MealId = parentNode.getAttribute("id");
      AddingFavorite(MealId, event.target);
    }
  });
}

// Getting Favorite Meals
{
  // printing fav meals
  function printInFavMeals(data) {
    favoriteMealContainer.innerHTML += `
    <div class="favoriteMeal">
        <div class="F-MealImage" ${data.meals[0].idMeal}>
          <img src=${data.meals[0].strMealThumb} alt="" id="favoriteMealImage">
        </div>
        <div class="F-MealName">
          <p class="para">${data.meals[0].strMeal}</p>
          <i class="fa-solid fa-trash" style="color: #c00202" id="Delete" data-id="${data.meals[0].idMeal}" ></i>
        </div>
    </div>`;
  }

  // Fetching Favorite Meal From API
  function fetchFavMeal(Meal_id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Meal_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        printInFavMeals(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // getting Favorite Meals From Local Storage
  function getMealFromLocalStorage() {
    favoriteMealContainer.innerHTML = "";
    if (localStorage.length != 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let Meal_id = localStorage.key(i);
        fetchFavMeal(Meal_id);
      }
    } else {
      console.log("Empty");
    }
  }
  FavoriteMealBtn.addEventListener("click", () => {
    Aside_section.style.display = "block";
    getMealFromLocalStorage();
  });

  closesFavBtn.addEventListener("click", () => {
    Aside_section.style.display = "none";
  });
}

// Random Meals
{
  let printRandomMeal = (data) => {
    for (let i = 0; i < data.meals.length; i++) {
      printMeals(
        data.meals[i].strMeal,
        data.meals[i].idMeal,
        data.meals[i].strMealThumb
      );
    }
  };
  // Adding some random Indian Meals In DOM
  function RandomMeals() {
    mealsContainer.innerHTML = "";
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        printRandomMeal(data);
      })
      .catch((err) => {
        console.log("error");
      });
  }
  RandomMeals();
}

// Details Information Of Meals
{
  function fetchingMealForDetails(element) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element}`)
      .then((res) => {
        return res.json();
      })
      // Sending the data to details Html File
      .then((data) => {
        let DataToBeTransfer = JSON.stringify(data);
        var url = "../views/details.ejs?data=" + encodeURIComponent(DataToBeTransfer);
        // New window will open in the new tab
        window.open(url, "_blank");
      })
      .catch((err) => {
        console.log("Error Occurred");
      });
  }
  window.document.addEventListener("click", (event) => {
    
    // If clicking any Meal Or its name then the detail page will open
    if (
      event.target.getAttribute("class") == "mealTheme" ||
      event.target.getAttribute("class") == "mealName"
    ) {
      fetchingMealForDetails(event.target.getAttribute("id"));
    }

    // if clicking on suggest name then it will be copied in input box and suggestionContainer display become none
    if(event.target.getAttribute('class')=='suggestion'){
      inputBox.value = event.target.textContent;
      suggestionContainer.style.display = 'none';
    }

  });
}

// Delete From Favorite Meal
{
    // Delete Meal 
    function deleteMeal(MealId){
        localStorage.removeItem(MealId);
        getMealFromLocalStorage(); //Calling fetchMeal
        RandomMeals();
    }
    window.document.addEventListener('click',(event)=>{
        if(event.target.getAttribute('id')=='Delete'){
           let MealId =  event.target.getAttribute('data-id');
           deleteMeal(MealId);
        }
    })
}

// Ham Burger Icon
{
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const navigationBar = document.querySelector('#navigationBar ul ');
  const closesNavBtn = document.getElementById('closesNavBtn');

  // click on hamburger icon, hamburger icon will hide and the navigation bar will appear
  hamburgerIcon.addEventListener('click',()=>{
    hamburgerIcon.style.display = 'none';
    navigationBar.style.display = 'flex';
  });

  //  And visa versa 
  closesNavBtn.addEventListener('click',()=>{
    hamburgerIcon.style.display = 'block';
    navigationBar.style.display = 'none';
  });
}

//Search by Category Section
{

  // Printing Meals
  function printMealCategory(name, id, image){
    let favIcon = "regular";
    if (localStorage.getItem(id) != null) {
      favIcon = "solid";
    }
    mealCategoryContainer.innerHTML += ` <div class="mealContainer">
            <div class="meal">
            <img
                src=${image}
                alt="..."
                class="mealTheme"
                id=${id}
            />
            <p class="mealName" id=${id}>
            ${name}<i class="fa-${favIcon} fa-heart fa-beat" style='color:#c00202;' id="Favorite" data-id="false"></i>
            </p>
            </div>
        </div> `;
  }

  // Fetching data From API
  function searchMealByCategory(mealName){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`)
    .then((res)=>{
      return res.json();
    }).then((data)=>{
        let allMeal = data.meals;
        allMeal.forEach(element => {
          printMealCategory(element.strMeal,element.idMeal,element.strMealThumb);
        });
    });
  }

  // Iterating all over the category of meal
  function manipulateStyle(){
    mealCategoryContainer.innerHTML = "";
    showMealCategory.style.display = 'block';
    showMealCategory.style.position = 'fixed'
    showMealCategory.style.top = '10%';
    showMealCategory.style.left = '18%';
    document.body.style.overflow = 'hidden'
  } 

  MealCatagories.forEach(element => {
    element.addEventListener('click',(event)=>{
      let mealCategory = event.target.textContent; 
      manipulateStyle();
      searchMealByCategory(mealCategory);

      // Closing the ShowMealCategory
      closeMealCategory.addEventListener('click',()=>{
        showMealCategory.style.display='none';
        document.body.style.overflow = 'scroll'
      })
    });
  });

}
