//IIFE to avoide accessing global state
let pokemonRepository = (function () {
    //Created and populated pokemonList
    let pokemonList = [
        { name: "Bulbasaur", height: 0.7, types: ["grass", "poison","gas"] },
        { name: "Charmander", height: 0.6, types: ["fire"] },
        { name: "Squirtle", height: 0.5, types: ["water"] }
    ];

    return{
        getAll, add, addV
    };
})();
