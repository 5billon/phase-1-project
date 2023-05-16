fetch ("http://localhost:3000/cats")
  .then (response => response.json())
  .then((cats) => cats.forEach((cat) => renderPet(cat)))

  fetch ("http://localhost:3000/dogs")
  .then (response => response.json())
  .then((dogs) => dogs.forEach((dog) => renderPet(dog)))

const petCardsDiv = document.querySelector("#pet-cards")

function renderPet(pet) {
   

    const h2 = document.createElement('h2')
    h2.textContent = pet.name
    petCardsDiv.appendChild(h2)

    const img = document.createElement('img')
    img.src = pet.image
    img.className = 'pet-avatar'
    petCardsDiv.appendChild(img)

    const p = document.createElement('p')
    p.textContent = pet.votes
    petCardsDiv.appendChild(p)

    const button = document.createElement ('button')
    button.id = "vote-button"
    button.textContent = "Vote For Me!"
    petCardsDiv.append(button)


    button.addEventListener('click',addVotesToPet)


    function addVotesToPet(){
        pet.votes = parseInt(pet.votes) + parseInt(1)
        p.textContent = `${pet.votes} ❤️`
        
        
    }


}
function selectPets(pet) {
    const name = document.querySelector('#new-name')
    name.textContent = pet.name

    //console.log(name)

    const breed = document.querySelector('#new-breed')
    breed.textContent = pet.breed

    //console.log(breed)

    const color = document.querySelector('#new-color')
    color.textContent = pet.color

    //console.log(color)

    const age = document.querySelector('#new-age')
    age.textContent = pet.age

    //console.log(age)

    /*const votes = document.querySelector('#new-votes')
    votes.textContent = pet.votes

    console.log(votes)*/

    const img = document.querySelector('#new-image')
    img.src = pet.image

    //console.log(img)

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
        //"votes": e.target.votes.value,
        "image": e.target.image.value,
        "comment": e.target['new-comment'].value
    }

    renderPet(pet)

    selectPets(pet)

    e.target.reset()

}

let e = document.getElementById('pet-cards');
e.onmouseover = function() {
  document.getElementById('popup').style.display = 'block';
}
e.onmouseout = function() {
  document.getElementById('popup').style.display = 'none';
}