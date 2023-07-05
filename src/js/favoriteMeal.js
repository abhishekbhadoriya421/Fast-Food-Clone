const meal = document.querySelectorAll('.meal');

// handling mouse over event and display mealDetail content  
async function handleMouseOver(targetElement){
 const childMealDetails = targetElement.querySelector('.MealDetails');
 const childMealImage = targetElement.querySelector('.mealImage');
 childMealDetails.style.display = 'block';
 childMealImage.style.opacity = '0.5';
}

// when ever mouse out all should be normal
async function handleMouseOut(targetElement){
    const childMealDetails = targetElement.querySelector('.MealDetails');
    const childMealImage = targetElement.querySelector('.mealImage');
    childMealDetails.style.display = 'none';
    childMealImage.style.opacity = '1';
}
meal.forEach(ele => {
    ele.addEventListener('mouseover',(event)=>{
        handleMouseOver(ele);
    });

    ele.addEventListener('mouseout',(event)=>{
        handleMouseOut(ele);
    })
});
