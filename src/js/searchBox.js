const inputBox = document.getElementById("searchBox");
const suggestionContainer = document.querySelector(".suggestion-container");

let typedKey = ""; // it will contain input values
// Check that the suggestion should display or not
function suggestionDisplay() {
  if (typedKey.length == 0) {
    suggestionContainer.style.display = "none";
  }

  if (typedKey.length > 0) {
    suggestionContainer.style.display = "block";
  }
}

// Printing Suggestions creating new p tag element and appending into the suggestionContainer
function printSuggestions(mealName) {
  let newEle = document.createElement("p");
  newEle.classList.add("suggestion");
  newEle.textContent = mealName;
  suggestionContainer.appendChild(newEle);
}

// Getting the API data
function getSuggestion(meal) {
  suggestionContainer.innerHTML = "";
  suggestionDisplay();
  for (let i = 0; i < meal.length; i++) {
    printSuggestions(meal[i].strMeal);
  }
}

// Fetching the data From API
async function searchSuggestion(key) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`
    );
    const data = await response.json();
    getSuggestion(data.meals);
  } catch (err) {
    console.log(err);
  }
}

// Adding Event Handler on inputBox
inputBox.addEventListener("input", () => {
  typedKey = inputBox.value;
  searchSuggestion(typedKey);
});

//   Copying the value from suggestion and send it to input box
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("suggestion")) {
    inputBox.value = event.target.textContent;
    inputBox.focus();
  }
});

// if click on search btn it must transfer 
const search_button = document.getElementById('search-button');
search_button.addEventListener('click', () => {
    const meal = inputBox.value;
    search_button.setAttribute('href',`/searchMeal/Result?type=name&&name=${meal}`)
});
