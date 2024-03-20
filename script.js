"use strict";

const inputBuscar = document.getElementById("buscar");
const botonBuscar = document.getElementById("botonBuscar");
const pokemonInfo = document.getElementById("pokemonInfo");
const allPokemon = document.getElementById("allPokemon");

// Esto es para agregar ujn evento de click al botón buscarPokémon, donde llamamos a la función con el mismo nombre
botonBuscar.addEventListener("click", buscarPokemon);

// Aquí agregamos un evento al elemento inputBuscar para eliminar la busqueda anterior mientras estamos escribiendo de nuevo en el input para una nueva búsqueda
inputBuscar.addEventListener("input", limpiarBusquedaAnterior);


// Se ejecuta cuando pulsamos el botón de búsqueda y tiene como objetivo obtener el nombre del pokemon ingresado
function buscarPokemon() {
  const pokemonName = inputBuscar.value.trim().toLowerCase();

  if (pokemonName === "") {
    alert("Por favor, introduce el nombre del Pokémon.");
    return;
  }

  // URL de la api
  const searchURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  // Realizar la solicitud a la API
  fetch(searchURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se encontró el Pokémon");
      }
      return response.json();
    })
    .then(data => {
      // Limpiar la información previa de Pokémon
      pokemonInfo.innerHTML = "";
      
      mostrarPokemon(data);
    })
    .catch(error => {
      console.error("Error de búsqueda:", error.message);

      //En caso de no introducir un nombre válido se crea una alerta con el siguiente mensaje
      alert("No se encontró el Pokémon. Inténtalo de nuevo.");
    });
}

function limpiarBusquedaAnterior() {
  // Limpiar la información previa de búsqueda cuando se escriba en el input
  pokemonInfo.innerHTML = "";
}

function mostrarPokemon(poke) {
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
      ${poke.types.map(type => `<p class="tipo">${type.type.name}</p>`).join("")}
    </div>
    <div class="pokemonStats">
      <p class="stat">${poke.height/10}m</p>
      <p class="stat">${poke.weight/10}Kg</p>
      <p class="stat">${poke.stats[0].base_stat}hp</p>
      <p class="stat">${poke.stats[1].base_stat}A</p>
      <p class="stat">${poke.stats[2].base_stat}D</p>
      <p class="stat">${poke.stats[5].base_stat}V</p>
    </div>
  `;

  // Mostrar el div con la información del Pokémon
  pokemonInfo.appendChild(div);
}



