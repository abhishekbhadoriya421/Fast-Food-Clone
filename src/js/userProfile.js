// User Profile
const profileStatus = document.getElementById('profileStatus');
const userProfile = document.querySelector('#profileStatus .userProfileIcon');
const userName = document.querySelector('#profileStatus .username');
const userDetails = document.querySelector('#profileStatus .userDetails');
const profile = document.getElementById('profile');

//to show the username when user hover on profileIcon
let clearTimeOutId;
userProfile.addEventListener('mouseover',()=>{
    clearTimeOutId = setTimeout(() => {
        userName.style.display = 'block';
    }, 1000);
});
//to hide the username when user hover out of profileIcon
userProfile.addEventListener('mouseout',()=>{
    if(clearTimeOutId){
        clearTimeout(clearTimeOutId);
    }
     userName.style.display = 'none';
   
});
//to show the user details when user click on profileIcon
userProfile.addEventListener('click',()=>{
    if(userDetails.style.display == 'none'){
        userDetails.style.display = 'block';   
        userName.style.display = 'none';    
    }else{
          userDetails.style.display = 'none';
    }
});