let charactersFromApi = []
let characters = document.getElementById("characters")
let apiResults = document.getElementById("results")
let container = document.getElementById("container")

fetch('http://hp-api.herokuapp.com/api/characters/students')
  .then(res => res.json())
  .then(data => {
    charactersFromApi = data
    console.log(data);
    data.map((character, index) => {
      characters.innerHTML += `<option value="${index}">${character.name}</option>`
    })
  })

characters.addEventListener("change", e => {
  apiResults.innerHTML = ""
  container.innerHTML = ""
  let charAttributes = ["name", "gender", "house", "yearOfBirth", "ancestry", "eyeColour", "hairColour", "patronus", "actor"]

  console.log("changing", e);
  let selectedChar = charactersFromApi[Number(e.target.value)]
  console.log(selectedChar)
  if (!selectedChar) {
    container.classList.add("invisible")
  }

  let image = document.createElement('img')
  image.src = selectedChar.image
  container.appendChild(image)

  let tbody = document.createElement("tbody")

  charAttributes.map(attr => {
    let tr = document.createElement("tr")
    let th = document.createElement("th")
    let td = document.createElement("td")
    th.textContent = attr
    th.style.textTransform = "capitalize"
    if (selectedChar[attr]) {
      td.textContent = selectedChar[attr]
    }
    else {
      td.textContent = 'unknown'
    }
    tbody.appendChild(tr)
    tbody.appendChild(th)
    tbody.appendChild(td)
  })
  console.log(tbody);
  apiResults.appendChild(tbody)
  container.appendChild(apiResults)
  if (apiResults) {
    container.classList.remove("invisible")
  }
})
