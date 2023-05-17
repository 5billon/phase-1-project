fetch ("http://localhost:3000/cats")
  .then (response => response.json())
  .then((cats) => cats.forEach((cat) => renderPet(cat)))

  fetch ("http://localhost:3000/dogs")
  .then (response => response.json())
  .then((dogs) => dogs.forEach((dog) => renderPet(dog)))

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
    p.textContent = pet.votes
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
        p.textContent = `${pet.votes} ❤️`
    }
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

function selectPets(pet) {
    const name = document.querySelector('#new-name')
    name.textContent = pet.name

    const breed = document.querySelector('#new-breed')
    breed.textContent = pet.breed

    const color = document.querySelector('#new-color')
    color.textContent = pet.color

    const age = document.querySelector('#new-age')
    age.textContent = pet.age

    const img = document.querySelector('#new-image')
    img.src = pet.image


    const comment = document.querySelector('#new-comment')
    comment.textContent = pet.comment

    //console.log(comment)
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

    selectPets(pet)

    e.target.reset()
}