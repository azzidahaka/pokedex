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

    //print out pokemon.name to console
    function showDetails(pokemon) {
        console.log(pokemon);
    };

    //function that prints out pokemon.name to console on button click
    function pokemonListener(button, pokemon){
        button.addEventListener('click', function(){
            showDetails(pokemon.name)
        });
    };

    return {
        getAll, add, addListItem
    };
})();

/*
Call getAll function for pokemonRespository
Loops through the list of pokemons and calls the addlistitemm function which adds the buttons to the html
*/
pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
});

