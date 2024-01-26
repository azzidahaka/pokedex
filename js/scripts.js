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

    //function adds pokemon passed in parameters to list of pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    };
    //function validates the pokemon being added before it is added to pokemonList
    function addV(pokemon) {
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
    return {
        getAll, add, addV
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
