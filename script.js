"use strict";
const listaDePokemon = document.querySelector("#pokemonList")
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++){
        fetch(URL +i)
            .then((response) => response.json())
            .then (data => showPokemon(data))
}

function showPokemon(poke) {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemonIdAtras">#${poke.id}</p>
            <div class="pokemonImage"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//${poke.id}.png" alt="pokemon"></div>
            <div class="pokemonImage"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${poke.id}.png" alt="pokemon"></div>
            <div class="pokemonInfo">
              <div class="nombreContenedor">
                <p class="pokemonId">#${poke.id}</p>
                <h2 class="pokemonNombre">${poke.name}</h2>
              </div>
              <div class="pokemonTipos">
                <p class="tipo">${poke.types[0].type.name}</p>
                <p class="tipo">${poke.types[1].type.name}</p>
              </div>
              <div class="pokemonStats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
                <p class="stat">${poke.stats[0].base_stat}hp</p>
                <p class="stat">${poke.stats[1].base_stat}A</
                p>
                <p class="stat">${poke.stats[2].base_stat}D</p>
                <p class="stat">${poke.stats[5].base_stat}V</p>
                
              </div>
            </div>
    `;
    pokemonList.append(div);
}
