let dogURL = "http://localhost:3000/pups"
let dogBar = document.querySelector('#dog-bar')
let dogImage = document.querySelector('#dog-image')
let dogH2 = document.querySelector('#dog-name')
let dogButton = document.querySelector('#dog-button')
let currentDog = {}


fetch(dogURL)
.then(res => res.json())
.then(dogArray => { 
dogArray.forEach(addDogToHeader)
})

function addDogToHeader (dogObj){
    let dogSpan = document.createElement("span")
    dogSpan.innerText = dogObj.name
    dogBar.append(dogSpan)
    dogSpan.addEventListener("click", function(){
        currentDog = dogObj
        dogImage.src = dogObj.image
        dogH2.innerText = dogObj.name
        if (dogObj.isGoodDog) {
            dogButton.innerText = 'Good Dog!'}
        else {
            dogButton.innerText = 'Bad Dog! To the pound!'
        }
    })
    }

    dogButton.addEventListener('click', function(){
        if (currentDog.isGoodDog)
        {currentDog.isGoodDog = false
        dogButton.innerText = 'Bad Dog! To the pound'}
        else {currentDog.isGoodDog = true
            dogButton.innerText = 'Good Dog'}

            //let currentGoodBoy = currentDog.isGoodDog 
        fetch(`http://localhost:3000/pups/${currentDog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({isGoodDog: currentDog.isGoodDog}),
        })
        .then(res => res.json())
        .then(function(updatedDog){
            currentDog.isGoodDog = updatedDog.isGoodDog
            console.log(updatedDog)
        })
        })
  