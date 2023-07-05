const CommentForm = document.getElementById("CommentForm");
const commentContainer = document.querySelector("#commentContainer");
const CommentInputBox = document.getElementById("CommentInputBox");
const LikeBtn = document.getElementById("LikeBtn");
const LikeCount = document.getElementById("LikeCount");

// Print on DOM
function printCommentHandler(userEmail, content) {
  let html = commentContainer.innerHTML;
  commentContainer.innerHTML =
    `
    <div id="userDetails">
        <img id="UserImage" src="" alt="">
        <span class="userEmail"><a href="">${userEmail}</a></span>
        <p class="userContent">
            ${content}
        </p>
    </div>
` + html;

  CommentInputBox.value = "";
}

// make comment Form Asynchronous on submit the comment
// will be sent to the server
// and the server will send the response
// to the client
CommentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // getting form data
  let formData = new FormData(CommentForm);
  let data = new Object();
  for (let entry of formData.entries()) {
    let key = entry[0];
    let val = entry[1];
    data[key] = val;
  }

  // destructure data
  let { userEmail, content } = data;

  printCommentHandler(userEmail, content);

  // sending form data to the server
  fetch("/detail/comment", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Comment submitted!");
      } else {
        console.log("Comment unSubmitted!");
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
});

// Handle Like
LikeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let likeCount = parseInt(LikeCount.textContent);
  let isLiked = LikeBtn.getAttribute("like");

  // If Liked then decrease the count other wise increase
  if (isLiked !== "Liked") {
    LikeCount.textContent = likeCount + 1;
    LikeBtn.innerHTML = `<i class="fa-solid fa-thumbs-up" style="color: #c70000;"></i>`
    LikeBtn.setAttribute('like','Liked')
  } else {
    LikeCount.textContent = likeCount - 1;
    LikeBtn.innerHTML =  `<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>`
    LikeBtn.setAttribute('like','NotLiked')
  }

  let href = LikeBtn.getAttribute("href");
  let id = href.split("=")[1];

  fetch(`/detail/Like/?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        console.log("SuccessFully");
      } else {
        console.log("Failed");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
