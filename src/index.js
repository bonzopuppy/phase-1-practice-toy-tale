let addToy = false;


document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const imgUrl = "http://localhost:3000/toys";
  const toyForm = document.querySelector('.add-toy-form');
  const toyCollection = document.getElementById('toy-collection');

  //Event listener for form submission
  toyForm.addEventListener('submit', function (event) {
    //Prevent Default
    event.preventDefault();

    //get the values from the form inputs
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;

    //Create the toy data object
    const toyData = {
      "name": toyName,
      "image": toyImage,
      "likes": 0
    };

    //Send POST reqest to add the new toy
    fetch(imgUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
    })
      .then(response => response.json())
      .then(newToy => {
        //Add new toy to the DOM
       
        const newToyCard = createToyCard(newToy);
        toyCollection.appendChild(newToyCard);

        //clear the form input
        toyForm.reset();
      })
      .catch(error => console.log('Error', error));

  });

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // function to create a toy card
  function createToyCard(toy) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar"/>
      <p>${toy.likes} Likes <p>
      <button class="like-btn" id="like-btn-${toy.id}">Like ❤️</button>
      `;

    //Find the like button attach a listener
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => updateToyLikes(toy.id, toy.likes));
    return card;
  }

  //function to render toys
  function renderToys(toys) {
    // Clear the container
    toyCollection.innerHTML = '';
    toys.forEach(toy => {
      const toyCard = createToyCard(toy);
      toyCollection.appendChild(toyCard);
    });
  }

  //function to update toy likes
  function updateToyLikes(toyId, currentLikes) {
    const newLikes = currentLikes + 1;
    fetch(`${imgUrl}/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
      .then(response => response.json())
      .then(updatedToy => {
        //update the Likes for the toy
        document.querySelector(`#like-btn-$(toyId})`).previousElementSibling.innerText = `${updatedToy.likes} Likes`;
      })
      .catch(error => console.error('Error', error));
  }

  //fetch toys
  fetch(imgUrl)
    .then(response => response.json())
    .then(toys => {
      renderToys(toys);
    })
    .catch(error => console.error('Error fetching toys:', error));

});