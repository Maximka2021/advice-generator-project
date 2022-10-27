//maxim's branch

var cssFile = document.createElement("link");
cssFile.rel = "stylesheet";
cssFile.href = ".//styles.css";
//document.head.appendChild(cssFile);

const url = "http://localhost:3000/new_advice";
const userAdvice = document.querySelector("#user-advice");
const newAdviceInput = document.querySelector("#new-advice-input");
const quoteBtn = document.querySelector("#btn-quote");
const newNameInput = document.querySelector("#new-name-input");
const submitAdvice = document.querySelector("#submit-advice");
const author = document.querySelector("#author");
const allAdvicesContainer = document.querySelector(".all-advices-container");
// shows random advice when page loads
function fetchFunc() {
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      displayAdvice(data);
    });
}

function func(){
  fetch(url)
  .then((r) => r.json())
  .then((data) => {
    //console.log(data)
    displayAll(data);
    sortFunc(data)
  });
}

// shows random advice when page loads

//shows random advcie when button is clicked
quoteBtn.addEventListener("click", fetchFunc);
//shows random advcie when button is clicked

//displays advice and author on the page
function displayAdvice(data) {
  adviceArray = data.map((elem) => elem.advice);
  const randomAdvice =
    adviceArray[Math.floor(Math.random() * adviceArray.length)];
  userAdvice.textContent = randomAdvice;

  fetch(`${url}/?advice=${randomAdvice}`)
    .then((r) => r.json())
    .then((data) => data.forEach((elem) => displayName(elem)));
}
//displays advice and author on the page

// shows name of the author
function displayName(elem) {
  author.textContent = `-${elem.name}-`;
}
// shows name of the author

//checks wether fields are empty or not
submitAdvice.addEventListener("click", () => {
  if (newNameInput.value === "" || newAdviceInput.value === "") {
    alert("Fields cannot be empty");
  } else {
    checkLength();
  }
});
//checks wether fields are empty or not

//checks the length of the name and advice
function checkLength() {
  if (newNameInput.value.length < 5) {
    alert("Your name should be longer than 4 characters");
  } else {
    if (newAdviceInput.value.length <= 10) {
      alert("Your advice should be longer than 10 characters");
    } else {
      saveAdvice();
    }
  }
}
//checks the length of the name and advice

//checks if advice is alreday exist and saves a new one
function saveAdvice() {
  console.log("Function is running");
  const newData = {
    name: newNameInput.value,
    advice: newAdviceInput.value,
    likes: 0,
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  newNameInput.value = "";
  newAdviceInput.value = "";
  console.log("Created Successfuly");
}

//checks if advice is alreday exist and saves a new one
let num = 1;
//dislays all advices and authors from json
function displayAll(data) {
  data.forEach((elem) => {
    
    function createContainer(){
      num += 1;
      const nameAndAdviceContainer = document.createElement("div");
      const adviceTextContainer = document.createElement("p");
      const nameTextContainer = document.createElement("p");
      const likeBtn = document.createElement("button");
      likeNumber = document.createElement("p");

      adviceTextContainer.className = "adviceTextContainer";
      nameTextContainer.className = "nameTextContainer";
      nameAndAdviceContainer.className = "nameAndAdviceContainer";
      likeBtn.className = "likeBtn";
      likeNumber.className = "likeNumber";
  
      adviceTextContainer.textContent = `"${elem.advice}"`;
      nameTextContainer.textContent = `-${elem.name}-`;
      likeBtn.textContent = "Like";
      likeNumber.textContent = elem.likes;
  
      nameAndAdviceContainer.append(
        adviceTextContainer,
        nameTextContainer,
        likeBtn,
        likeNumber
      );
      document.body.append(nameAndAdviceContainer);
      likeBtn.addEventListener("click", addLike);
    }
    if(num <= 10){
      createContainer()
    }
    let like = elem.likes;
    function addLike() {
      like++;
      fetch(`${url}/${elem.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: like
        }),
      })
      .then(r => r.json())
      .then(() => {likeNumber.textContent = elem.likes;})
    }
  });
}
//dislays all advices and authors from json

func()
fetchFunc();


