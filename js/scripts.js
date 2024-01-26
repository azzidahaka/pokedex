//IIFE tom avoide accessing global state
let pokemonRepository = (function () {
    //Created and populated pokemonList
    let pokemonList = [
        { name: "Bulbasaur", height: 0.7, types: ["grass", "poison","gas"] },
        { name: "Charmander", height: 0.6, types: ["fire"] },
        { name: "Squirtle", height: 0.5, types: ["water"] }
    ];

    //function returns list of pokemon object
    function getAll(){
        return pokemonList;
    };

    //function adds pokemon passed in parameters to list of pokemon
    function add(pokemon){
        pokemonList.push(pokemon);
    };
    //function validates the pokemon being added before it is added to
    function addV(pokemon){
        if( typeof pokemon === "object" &&
        "name" in pokemon &&
        "height" in pokemon &&
        "types" in pokemon){
            pokemonList.push(pokemon);
        }
        else{
            alert("information provided is not valid");
        }

    };
    return{
        getAll, add, addV
    };
})();
