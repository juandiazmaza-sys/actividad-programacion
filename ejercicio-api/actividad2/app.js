import {
  obtenerPokemon,
  listarPokemon,
  obtenerTipo
} from "./pokeapi.service.js";

import {
  obtenerPersonaje,
  listarPersonajes
} from "./rickandmorty.service.js";

async function main() {
  try {
    console.log("=== POKEAPI ===");

    const pokemon = await obtenerPokemon("pikachu");
    // const pokemon = await obtenerPokemon("pokemoninventado");

    const tipos = pokemon.types
      .map((elemento) => elemento.type.name)
      .join(", ");

    const habilidades = pokemon.abilities
      .map((elemento) => elemento.ability.name)
      .join(", ");

    console.log("Nombre:", pokemon.name);
    console.log("Peso:", pokemon.weight / 10, "kilogramos");
    console.log("Tipos:", tipos);
    console.log("Habilidades:", habilidades);

    console.log("\n=== LISTA DE POKEMON ===");

    const lista = await listarPokemon(10);

    lista.results.forEach((elemento, indice) => {
      console.log(`${indice + 1}. ${elemento.name}`);
    });

    console.log("\n=== TIPO FUEGO ===");

    const tipoFuego = await obtenerTipo("fire");

    tipoFuego.pokemon.slice(0, 5).forEach((elemento, indice) => {
      console.log(`${indice + 1}. ${elemento.pokemon.name}`);
    });

    console.log("\n=== RICK AND MORTY ===");

    const personaje = await obtenerPersonaje(1);

    console.log("Nombre:", personaje.name);
    console.log("Estado:", personaje.status);
    console.log("Especie:", personaje.species);
    console.log("Origen:", personaje.origin.name);

    console.log("\n=== LISTA DE PERSONAJES ===");

    const personajes = await listarPersonajes(1);

    personajes.results.slice(0, 5).forEach((elemento, indice) => {
      console.log(`${indice + 1}. ${elemento.name}`);
    });
  } catch (error) {
    console.log("Ocurrio un error:", error.message);
  }
}

main();