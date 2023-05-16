

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













