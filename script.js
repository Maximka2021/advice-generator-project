console.log('Hello World 2')

fetch('https://api.adviceslip.com/advice')
.then(r => r.json())
.then(data => console.log(data))