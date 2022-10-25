// const randomAdvice = document.querySelector("#random-advice");
const userAdvice = document.querySelector("#user-advice");
const newAdviceInput = document.querySelector("#new-advice-input");
const newNameInput = document.querySelector("#new-name-input");
const submitAdvice = document.querySelector("#submit-advice");

// fetch("https://api.adviceslip.com/advice")
//   .then((r) => r.json())
//   .then((data) => displayRandomAdvice(data));

fetch("http://localhost:3000/new_advice")
  .then((r) => r.json())
  .then((data) => displayUserAdvice(data));

// function displayRandomAdvice(data) {
//   randomAdvice.textContent = data.slip.advice;
// }

function displayUserAdvice(data) {
  arrayOfAdvices = data.map((item) => item.advice);
  let randomAdvice =
    arrayOfAdvices[Math.floor(Math.random() * arrayOfAdvices.length)];
  userAdvice.textContent = randomAdvice;
}

submitAdvice.addEventListener("click", createNewAdvice);

function createNewAdvice(e) {
  e.preventDefault()

<<<<<<< HEAD
  const newData = {
    name: newNameInput.value,
    advice: newAdviceInput.value,
  };
  fetch("http://localhost:3000/new_advice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
}
=======
  arrayOfAdvices.forEach(elem => {
    if(elem = newAdviceInput.value){
      alert('Error')
    }else{
      const newData = {
        name: newNameInput.value,
        advice: newAdviceInput.value,
      };
    
      fetch("http://localhost:3000/new_advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
    }
  })

}
>>>>>>> c102c5bf1c05ed697add0759ded6759672f2a497
