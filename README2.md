Initialize a flag 'addToy' as false

When the DOM content is fully loaded:
    Get the 'Add New Toy' button and the form container from the DOM
    Get the base URL for the toys API
    Get the toy submission form from the DOM

    Add a submit event listener to the toy form:
        Prevent the form's default submission action
        Retrieve the toy name and image URL from the form inputs
        Construct a toy data object with name, image, and likes initialized to 0
        Send a POST request to the server with the toy data to add a new toy
            On success:
                Create a new toy card in the DOM with the toy data
                Reset the form inputs
            On error, log the error to the console

    Add a click event listener to the 'Add New Toy' button:
        Toggle the display of the toy form container on each click

    Define a function 'createToyCard' that takes a toy object and returns a card element:
        Create a new card element with the toy's details
        Add a click event listener to the like button in the card:
            Call 'updateToyLikes' passing the toy's id and current likes

    Define a function 'renderToys' that takes an array of toy objects:
        Clear the current toys in the DOM
        For each toy, create a toy card and append it to the DOM

    Define a function 'updateToyLikes' that takes a toy id and current likes:
        Increment the likes count
        Send a PATCH request to the server with the updated likes count
            On success:
                Update the likes count in the toy's card in the DOM
            On error, log the error to the console

    Fetch the initial list of toys from the server:
        On success, call 'renderToys' with the fetched toys
        On error, log the error to the console

Alt: 

Initialize a flag 'addToy' as false

When the DOM content is fully loaded:

    Define all functions first:
        - Function to create a toy card
        - Function to render toys
        - Function to update toy likes

    Get the 'Add New Toy' button and the form container from the DOM
    Get the base URL for the toys API
    Get the toy submission form from the DOM

    Add a submit event listener to the toy form
    Add a click event listener to the 'Add New Toy' button

    Fetch the initial list of toys from the server:
        On success, call 'renderToys' with the fetched toys
        On error, log the error to the console