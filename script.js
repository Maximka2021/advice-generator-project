// const randomAdvice = document.querySelector("#random-advice");
const userAdvice = document.querySelector("#user-advice");
const newAdviceInput = document.querySelector("#new-advice-input");
const newNameInput = document.querySelector("#new-name-input");
const submitAdvice = document.querySelector("#submit-advice");


fetch("http://localhost:3000/new_advice")
  .then((r) => r.json())
  .then((data) => displayUserAdvice(data));


function displayUserAdvice(data) {
  arrayOfAdvices = data.map((item) => item.advice);
  let randomAdvice =
    arrayOfAdvices[Math.floor(Math.random() * arrayOfAdvices.length)];
  userAdvice.textContent = randomAdvice;
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// const shareData = {
//   url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share'
// }

const userAdvice2 = document.querySelector('.user-advice-container')
const btn2 = document.createElement("button");
btn2.innerText = " Share"
userAdvice2.appendChild(btn2)

btn2.addEventListener('click', share);

  function share() {    
    if (navigator.share) {
         navigator.share({
            url :'http://localhost:3000/new_advice',
         }) 
            .then(() => console.log('shared successfully'))
            .catch((error) => console.log('sharing failed', error))
      }else {
      console.log("Oops...I dont support this browser");
      }
  }

// // Share must be triggered by "user activation"
// btn2.addEventListener('click', event => {
//   if (navigator.share) {
//     navigator.share({
//       url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
//     }).then(() => {
//       console.log('Thanks for sharing!');
//     })
//     .catch(console.error);
//   } 
// })

////////////////////////////////////////////////////////////////////////////////
submitAdvice.addEventListener("click", createNewAdvice);

function createNewAdvice(e) {
  e.preventDefault()

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

