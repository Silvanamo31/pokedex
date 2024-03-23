"use strict";

const inputBuscar = document.getElementById("buscar");
const botonBuscar = document.getElementById("botonBuscar");
const pokemonInfo = document.getElementById("pokemonInfo");
const allPokemon = document.getElementById("allPokemon");

// Esto es para agregar un evento de click al botón buscarPokémon, donde llamamos a la función con el mismo nombre
botonBuscar.addEventListener("click", buscarPokemon);

// Aquí agregamos un evento al elemento inputBuscar para eliminar la búsqueda anterior mientras estamos escribiendo de nuevo en el input para una nueva búsqueda
inputBuscar.addEventListener("input", limpiarBusquedaAnterior);

// Aqui agregamos un evento de escucha para que al pulsar enter se realice la llamada al igual que cuando hacemos click en el botón.
document.addEventListener('keydown', function(event) {
  // Se verifica si la tecla presionada es Enter (código de tecla 13)
  if (event.keyCode === 13) {
      // Si es Enter, llamar a la función buscarPokemon
      buscarPokemon();
  }
});

// Definimos un objeto que mapea los tipos de Pokémon con las variables CSS correspondientes
const typeColors = {
  normal: "--type-normal",
  fire: "--type-fire",
  water: "--type-water",
  grass: "--type-grass",
  electric: "--type-electric",
  ice: "--type-ice",
  fighting: "--type-fighting",
  poison: "--type-poison",
  ground: "--type-ground",
  flying: "--type-flying",
  psychic: "--type-psychic",
  bug: "--type-bug",
  rock: "--type-rock",
  ghost: "--type-ghost",
  dark: "--type-dark",
  dragon: "--type-dragon",
  steel: "--type-steel",
  fairy: "--type-fairy"
};

// Se ejecuta cuando pulsamos el botón de búsqueda y tiene como objetivo obtener el nombre del Pokémon ingresado
function buscarPokemon() {
  const pokemonName = inputBuscar.value.trim().toLowerCase();

  if (pokemonName === "") {
    alert("Por favor, introduce el nombre del Pokémon.");
    return;
  }

  // URL de la API para obtener todos los Pokémon
  const allPokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=1118`;

  // Realizar la solicitud a la API para obtener todos los Pokémon
  fetch(allPokemonURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de Pokémon.");
      }
      return response.json();
    })
    .then(data => {
      const matchingPokemon = data.results.filter(pokemon => pokemon.name.includes(pokemonName));
      if (matchingPokemon.length === 0) {
        throw new Error('No se encontró ningún Pokémon que coincida con la búsqueda.');
      }
      return Promise.all(matchingPokemon.map(pokemon => fetch(pokemon.url).then(response => response.json())));
    })
    .then(pokemonDetails => {
      mostrarPokemon(pokemonDetails);
    })
    .catch(error => {
      console.error("Error de búsqueda:", error.message);

      // En caso de no encontrar ningún Pokémon que coincida con la búsqueda, mostrar un mensaje de error
      alert("No se encontró ningún Pokémon que coincida con la búsqueda. Inténtalo de nuevo.");
    });
}

function limpiarBusquedaAnterior() {
  // Limpiar la información previa de búsqueda cuando se escriba en el input
  pokemonInfo.innerHTML = "";
}

function mostrarPokemon(pokemonDetails) {
  // Limpiar la información previa de Pokémon
  pokemonInfo.innerHTML = "";

  pokemonDetails.forEach(poke => {
    // Crear un nuevo div para mostrar la información del Pokémon
    const div = document.createElement("div");
    div.classList.add("pokemon");

    // HTML para mostrar la información del Pokémon
    div.innerHTML = `
      <p class="pokemonId">#${poke.id}</p>
      <h2 class="pokemonNombre">${poke.name}</h2>
      <div class="pokemonImagen">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${poke.name}">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${poke.id}.png" alt="${poke.name}">
      </div>
      <div class="pokemonTipos">
        ${poke.types.map(type => `<p class="tipo" style="background-color: var(${typeColors[type.type.name]});">${type.type.name}</p>`).join("")}
      </div>
      <div class="pokemonStats">
        <p class="stat">${poke.height/10}m</p>
        <p class="stat">${poke.weight/10}Kg</p>
        <p class="stat">${poke.stats[0].base_stat}hp</p>
        <p class="stat">${poke.stats[1].base_stat}Atq</p>
        <p class="stat">${poke.stats[2].base_stat}Def</p>
        <p class="stat">${poke.stats[5].base_stat}Vel</p>
      </div>
    `;

    // Mostrar el div con la información del Pokémon
    pokemonInfo.appendChild(div);
  });
}
