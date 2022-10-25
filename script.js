//maxim's branch

const userAdvice = document.querySelector("#user-advice");
const newAdviceInput = document.querySelector("#new-advice-input");
const quoteBtn = document.querySelector('#btn-quote');
const newNameInput = document.querySelector("#new-name-input");
const submitAdvice = document.querySelector("#submit-advice");
const author = document.querySelector('#author');

quoteBtn.addEventListener('click', displayInfo)


fetch('http://localhost:3000/new_advice')
.then(r => r.json())
.then(data => displayAdvice(data))

function displayInfo(){
  fetch('http://localhost:3000/new_advice')
  .then(r => r.json())
  .then(data => displayAdvice(data))
}

function displayAdvice(data){
  const adviceArray = data.map(elem => elem.advice);
  const randomAdvice = adviceArray[Math.floor(Math.random()*adviceArray.length)];
  userAdvice.textContent = randomAdvice;

  fetch(`http://localhost:3000/new_advice/?advice=${randomAdvice}`)
  .then(r => r.json())
  .then(data => data.forEach(elem => displayName(elem)))
}

function displayName(elem){
  author.textContent = `By ${elem.name}`;
}

submitAdvice.addEventListener('click', saveAdvice)

function saveAdvice(e){
  e.preventDefault();

  const newData = {
    name:newNameInput.value,
    advice:newAdviceInput.value
  }
  fetch('http://localhost:3000/new_advice', {
    method: "POST",
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(newData)
  })
  newNameInput.value = '';
  newAdviceInput.value = '';
}


