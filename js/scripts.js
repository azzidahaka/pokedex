//Created and populated pokemonList
const pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Squirtle", height: 0.5, types: ["water"] }
  ];

//Loop through pokemonList and print out the name and height
for (let i = 0; i < pokemonList.length; i++) {
    document.write('<p>'+'The ' + pokemonList[i].name + ' is ' + pokemonList[i].height + 'm tall.');
    //Comment on size of pokemon ff height is > 0.6
    if (pokemonList[i].height>0.6){
        document.write('-- Wow, that\’s big!');
    }
    document.write("</p>");

}