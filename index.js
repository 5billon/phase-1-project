fetch("http://localhost:3000/pets")
  .then(response => response.json())
  .then(pets => pets.forEach((pet) => renderPet(pet)))

const petCollection = document.querySelector("#pet-collection")

function renderPet(pet) {
    const petCard = document.createElement('div')
    petCard.className = 'card'

    const h2 = document.createElement('h2')
    h2.textContent = pet.name
    petCard.appendChild(h2)

    const img = document.createElement('img')
    img.src = pet.image
    img.className = 'pet-avatar'
    img.addEventListener('mouseover', makePopUp)
    img.addEventListener('mouseout', deletePopUp)
    petCard.appendChild(img)

    const p = document.createElement('p')
    p.textContent = `Votes: ${pet.votes} `
    petCard.appendChild(p)

    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.style.display = 'none'
    popup.appendChild(getPopupList(pet))
    petCard.appendChild(popup)

    const button = document.createElement('button')
    button.id = "vote-button"
    button.textContent = "Vote For Me!"
    petCard.append(button)

    petCollection.appendChild(petCard)

    button.addEventListener('click', addVotesToPet)

    function addVotesToPet() {
        pet.votes = parseInt(pet.votes) + parseInt(1)
        p.textContent = `Votes: ${pet.votes} ❤️`
    }

    const type = document.createElement("p")
    type.className = "pet-type"
    type.textContent = pet.animal
    type.style.display = 'none'
    petCard.appendChild(type)
 }

function getPopupList(pet) {
  let info = document.createElement('ul')

  let breed = document.createElement('dl')
  breed.textContent = `Breed: ${pet.breed}`
  info.appendChild(breed)

  let furcolor = document.createElement('dl')
  furcolor.textContent = `Color: ${pet.color}`
  info.appendChild(furcolor)
  
  let age = document.createElement('dl')
  age.textContent = `Age: ${pet.age}`
  info.appendChild(age)

  let comment = document.createElement('dl')
  comment.textContent = `${pet.comment}`
  info.appendChild(comment) 
  
  return info
}

function makePopUp(e) {
  //console.log("makePopUp")
  //console.log(e)
  const petCard = e.target.parentElement
  let popup = petCard.querySelector(".popup")
  popup.style.display = 'block';
}

function deletePopUp(e) {
  //console.log("deletePopUp")
  //console.log(e)
  const petCard = e.target.parentElement
  let popup = petCard.querySelector(".popup")
  popup.style.display = 'none';
}

const form = document.querySelector('#new-pet')

form.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e) {
    e.preventDefault()

    const pet = {
        "name": e.target.name.value,
        "breed": e.target.breed.value,
        "color": e.target.color.value,
        "age": e.target.age.value,
        "votes": "0",
        "image": e.target.image.value,
        "comment": e.target['new-comment'].value
    }

    renderPet(pet)

    e.target.reset()
}

const filterForm = document.querySelector('#filter-form')

filterForm.addEventListener('submit', (e) => handleFilter(e))

function handleFilter(e) {
    e.preventDefault()

    const type = e.target.type.value
    pets = petCollection.querySelectorAll(".card")

    //console.log(pets)

    pets.forEach(pet => {
      const petType = pet.querySelector(".pet-type").textContent
      if (petType === type) {
        pet.style.display = 'inline-grid'
      } else {
        pet.style.display = 'none'
      }
    })
}