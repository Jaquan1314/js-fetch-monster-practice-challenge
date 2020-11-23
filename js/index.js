const mContainer = document.querySelector("#monster-container")
const cMonsterDiv = document.querySelector("#create-monster")
const fBtn = document.querySelector("#forward")
const bBtn = document.querySelector("#back")
let page = 1
// after clicking on button, load the next 50 monsters and show them on page
function btnClick(event) {
  if (event.target.matches("#back")) {
    page--
    renderMonsters(page)
  } else if (event.target.matches("#forward")) {
    page++
    renderMonsters(page)
  }
}

document.addEventListener('click', btnClick)

function formSubmit(event) {
  event.preventDefault()

  const newMonster = {
    name: event.target.name.value,
    age: event.target.age.value,
    description: event.target.description.value
  }

  fetch("http://localhost:3000/monsters/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newMonster)
  })
  .then(resp => resp.json())
  .then(data => renderMonster(data))

  event.target.reset()
}

function renderForm () {
  const mForm = document.createElement("form")
  mForm.innerHTML = `
    <label for="name">Name:</label>
    <input id="name" value>
    <label for="age">Age:</label>
    <input id="age" value>
    <label for="description">Description:</label>
    <input id="description" value>
    <button>Create Monstr</button>
  `
  cMonsterDiv.append(mForm)

  mForm.addEventListener("submit", formSubmit)
}

function renderAMonster(monster) {
  const mDiv = document.createElement("div")
  mDiv.dataset.id = monster.id
  mDiv.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}</p>
  `
  mContainer.append(mDiv)
}

function renderMonsters(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(resp => resp.json())
  .then(data => {
      data.forEach(monster => renderAMonster(monster))
    })
}

function initialize() {
  renderForm()
  renderMonsters(page)
}

initialize()