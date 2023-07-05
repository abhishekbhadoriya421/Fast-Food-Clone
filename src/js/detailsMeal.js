// Details and Instruction section
const MealDetailBtn = document.getElementById('MealDetailBtn');
const MealInstructionBtn = document.getElementById('MealInstructionBtn');
const InstructionContainer = document.querySelector('.Instruction');
const mealDetailsContainer = document.querySelector('.mealDetails');
// OrderMeal And Review Section
const OrderMealBtn = document.getElementById('OrderBtn');
const ReviewBtn = document.getElementById('ReviewBtn');
const MoreMealBtn = document.getElementById('MoreMealBtn');
const orderMeal = document.querySelector('.orderMeal');
const relatedMeal = document.querySelector('.relatedMeal');
const UserCommentAndReviews = document.querySelector('.UserCommentAndReviews');
// Add QuantityBtn
const addMeal =  document.getElementById('addMeal');
const increaseQuantity = document.getElementById('increaseQuantity');
const decreaseQuantity =  document.getElementById('decreaseQuantity')
const quantityCount =  document.getElementById('quantityCount');
const QuantityBtn =  document.querySelector('#QuantityBtn');

// if click on Details then instruction is be hidden 
MealDetailBtn.addEventListener('click',()=>{
    MealDetailBtn.classList.add('active');
    MealInstructionBtn.classList.remove('active');
    InstructionContainer.style.display = 'none';
    mealDetailsContainer.style.display = 'block';
});

// if click on instruction then Details is be hidden 
MealInstructionBtn.addEventListener('click',()=>{
    MealInstructionBtn.classList.add('active');
    MealDetailBtn.classList.remove('active');
    mealDetailsContainer.style.display = 'none';
    InstructionContainer.style.display = 'block';
});

// OrderMeal And Review Section

// active
function settingActiveClass(response){
    if(response === 'OrderMealBtn'){
        OrderMealBtn.classList.add('active');
        ReviewBtn.classList.remove('active');
        MoreMealBtn.classList.remove('active');
        orderMeal.style.display = 'flex';
        relatedMeal.style.display = 'none';
        UserCommentAndReviews.style.display = 'none';
    }else if(response=== 'ReviewBtn'){
        OrderMealBtn.classList.remove('active');
        ReviewBtn.classList.add('active');
        MoreMealBtn.classList.remove('active');
        orderMeal.style.display = 'none';
        relatedMeal.style.display = 'none';
        UserCommentAndReviews.style.display = 'block';
    }else{
        OrderMealBtn.classList.remove('active');
        ReviewBtn.classList.remove('active');
        MoreMealBtn.classList.add('active');
        orderMeal.style.display = 'none';
        relatedMeal.style.display = 'block';
        UserCommentAndReviews.style.display = 'none';
    }
}


// adding active class on OrderMealBtn
OrderMealBtn.addEventListener('click',()=>{
    settingActiveClass('OrderMealBtn');
});

// adding active class on ReviewBtn
ReviewBtn.addEventListener('click',()=>{
    settingActiveClass('ReviewBtn');
});

// adding active class on MoreMealBtn  
MoreMealBtn.addEventListener('click',()=>{
    settingActiveClass('MoreMealBtn');
});


// Add QuantityBtn

// Showing QuantityBtn on clicking on Add meal
addMeal.addEventListener('click',()=>{
    addMeal.style.display = 'none';
    QuantityBtn.style.display = 'flex';
});

let qCount = 1;

// Increase Meal Count
increaseQuantity.addEventListener('click',()=>{
    qCount++;
    quantityCount.textContent = qCount
})

// Decrease Count (At least there should be one Meal )
decreaseQuantity.addEventListener('click', ()=>{
    if(qCount>=2){
        qCount--;
        quantityCount.textContent = qCount
    }
});

// setting href value
quantityCount.addEventListener('click',()=>{
    let  href = quantityCount.getAttribute('href');
    // set the href value with quantity 
    quantityCount.setAttribute('href',`${href}${qCount}`);
})

// Favorite Meal Button
const FavoriteMeal =  document.getElementById('FavoriteMeal');

function changeFavBtnColor(){

    if(FavoriteMeal.getAttribute('favMeal') === 'true'){
        FavoriteMeal.style.backgroundColor = '#e4e6eb';
        FavoriteMeal.style.color = 'black';
    }else{
        FavoriteMeal.style.backgroundColor = 'red';
        FavoriteMeal.style.color = 'white';
    }
}

changeFavBtnColor();

FavoriteMeal.addEventListener('click',(event)=>{
    event.preventDefault();
    const xmlRequest = new XMLHttpRequest();

    xmlRequest.onload = function(){
        if(FavoriteMeal.getAttribute('favMeal')==='true'){
            FavoriteMeal.setAttribute('favMeal','false');
        }else{
            FavoriteMeal.setAttribute('favMeal','true');
        }
        changeFavBtnColor();
    }

    let href =  FavoriteMeal.getAttribute('href');
    const params = new URLSearchParams(href.split('?')[1]);
    const mealId = params.get('id');
    const requestUrl = '/searchMeal/myFavorite/?id=' + mealId;
    xmlRequest.open('get',requestUrl);
    xmlRequest.send();
})

