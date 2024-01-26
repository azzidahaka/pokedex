//IIFE to avoide accessing global state, pokemonRespository will hold IIFE return
let pokemonRepository = (function () {
    //Created and populated pokemonList
    let pokemonList = [
        { name: "Bulbasaur", height: 0.7, types: ["grass", "poison", "gas"] },
        { name: "Charmander", height: 0.6, types: ["fire"] },
        { name: "Squirtle", height: 0.5, types: ["water"] }
    ];

    //function returns list of pokemon object
    function getAll() {
        return pokemonList;
    };

    //function validates the pokemon being added before it is added to pokemonList
    function add(pokemon) {
        //checks if pokemon is valid, then adds to array if true
        if (typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon) {
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
        getAll, add,
    };
})();

/*
Call getAll function for pokemonRespository
Loops through the list of pokemons and prints out their name height and types
*/
pokemonRepository.getAll().forEach(pokemon => {
    document.write('<p>' + 'The ' + pokemon.name + ' is ' + pokemon.height + 'm tall and is of type ');
    /*If statement checks if the pokemon.type array  is more than 1 and prints each type
      tempType takes in the pokemon.type values and concatinates them into a string while adding ',' and whitespace to make print out cleaner
    */
    if (pokemon.types.length > 1) {
        let tempType = "";
        pokemon.types.forEach(type => {
            tempType += '' + type + ', ';
        });
        document.write(tempType.slice(0, -2) + '.');//removes the last 2 value which would be ','  and white space
    }
    else {
        document.write(pokemon.types + '.')
    }

    //react if its a big pokemon
    if (pokemon.height > 0.6) {
        document.write('-- Wow, that\’s big!');
    }
});
