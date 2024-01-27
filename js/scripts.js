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
        let pokemonUl = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        pokemonUl.classList.add('pokemon-list');
        button.classList.add('pokemon');
        listItem.appendChild(button);
        pokemonUl.appendChild(listItem);
        pokemonListener(button,pokemon);

    };

    /**
     *Function gets the pokemon information from the api
     -converts response into json and parses each pokemon in json, creates an object to take in name and details
     -add the object into a new array

     */
    function loadList(){
        showLoadingMessage();
        return fetch(apiUrl).then(function(response){

            return response.json();
        }).then (function(json){
            json.results.forEach(function (item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            hideLoadingMessage();
        }).catch(function(e){
            console.error(e);
            hideLoadingMessage();
        })
    }

    /**
     *Function takes in a pokemon
     *fetches the url, once promise has been resolved, it converts the response into json and creates new objects to take in the additional information
     */
    function loadDetails(pokemon){
        showLoadingMessage();
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response){
            return response.json();
        }).then(function(details){
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            hideLoadingMessage();
        })
        .catch(function(e){
            console.error(e);
            hideLoadingMessage();
        });
    }

    //print out pokemon to console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (){
            console.log(pokemon);
        });
    };

    //function that prints out pokemonto console on button click
    function pokemonListener(button, pokemon){
        button.addEventListener('click', function(){
            showDetails(pokemon)
        });
    };

    //print out loading while waiting for a responce
    function showLoadingMessage(){
        console.log("Loading");
        let loading = document.createElement('h2');
        let body = document.querySelector('body');
        loading.innerText = 'Loading.......';
        body.appendChild(loading);
    }

    //hide loading message once promise has been resolved or rejeccted
    function hideLoadingMessage(){
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
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });

});


