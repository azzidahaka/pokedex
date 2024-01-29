//IIFE to avoide accessing global state, pokemonRespository will hold IIFE return
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';//holds link to api


  //function returns list of pokemon object
  function getAll() {
    return pokemonList;
  };

  //function validates the pokemon being added before it is added to pokemonList
  function add(pokemon) {
    //checks if pokemon is valid, then adds to array if true
    if (typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
    else {
      alert("Invalid Pokemon");
    }

  };

  /*
  function recieves pokemon in parameters
  -queries <ul> then creates <li> and <button> using DOM
  -set text of button as pokemon.name
  -assign class to the ul and button so they can be called
  -assign button as a child of li and li as a child on the ul
  -call function to listen for button click and printout pokemon name
  */
  function addListItem(pokemon) {
    let pokemonUl = $('.list-group');
    let listItem = $('<li></li>').addClass('list-group-item');
    let button = $('<button></button>').
      attr('data-target', '#modalContainer').
      attr('data-toggle', 'modal').
      attr('type', 'button');
    button.text(pokemon.name);
    button.addClass('btn btn-primary');
    listItem.append(button);
    pokemonUl.append(listItem);
    pokemonListener(button, pokemon);

  };

  /**
   *Function gets the pokemon information from the api
   -converts response into json and parses each pokemon in json, creates an object to take in name and details
   -add the object into a new array

   */
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {

      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemonName = item.name;
        //capitalizes the first letter of the pokemon name
        pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        let pokemon = {
          name: pokemonName,
          detailsUrl: item.url
        };
        add(pokemon);
      });
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  /**
   *Function takes in a pokemon
   *fetches the url, once promise has been resolved, it converts the response into json and creates new objects to take in the additional information
   */
  function loadDetails(pokemon) {
    showLoadingMessage();
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
      hideLoadingMessage();
    })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  /**
   *
   * Function takes in pokemon object.
   * Add pokemon.name, height and image to modal.
   */
  function showDetails(pokemon) {
    let modalContainer = $('#modalContainer');
    modalContainer.html('');//empties the modal container
    let modalDialog = $('<div></div>').addClass('modal-dialog').attr('role', 'document');
    let modalContent = $('<div></div>').addClass('modal-content container');
    modalDialog.append(modalContent);
    modalContainer.append(modalDialog);
    loadDetails(pokemon).then(function () {
      modalContainer.attr('aria-labelledby', pokemon.name);
      let modalHeader = $('<div></div>').addClass('modal-header row ');
      let modalBody = $('<div></div>').addClass('modal-body row');
      let closeButtonElement = $('<button></button>').
        addClass('close').
        attr('data-dismiss', 'modal').
        attr('aria-label', 'Close');
      closeButtonElement.text('X');
      let pokemonName = $(`<h2>${pokemon.name}</h2>`).addClass('col-lg-8 col text-lg-right');
      let pokemonHeight = $(`<p class="col-12 text-center">Height: ${pokemon.height}</p>`);
      let pokemonImage = $('<img class="col text-center">').attr('src', pokemon.imageUrl).attr('alt', pokemon.name);
      //add all the created elements to the modal
      modalHeader.append(pokemonName);
      modalHeader.append(closeButtonElement);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonImage);
      modalContent.append(modalHeader);
      modalContent.append(modalBody);

    });
  };


  //removes is-visible class from modal to make it hiden
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');


  }

  //function that calls show details on button click
  function pokemonListener(button, pokemon) {
    button.on('click', function () {
      showDetails(pokemon)
    });
  };

  //print out loading while waiting for a responce
  function showLoadingMessage() {
    console.log("Loading");
    let loading = document.createElement('h2');
    let body = document.querySelector('body');
    loading.innerText = 'Loading.......';
    body.appendChild(loading);
  }

  //hide loading message once promise has been resolved or rejeccted
  function hideLoadingMessage() {
    let loading = document.querySelector('h2');
    loading.remove();
  }



  return {
    getAll, add, addListItem, loadList, loadDetails, showDetails
  };
})();

/*
Calls loadlist function to get all the pokemons from api, the adds it to respository
Call getAll function for pokemonRespository
Loops through the list of pokemons and calls the addlistitemm function which adds the buttons to the html
*/
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });

});


