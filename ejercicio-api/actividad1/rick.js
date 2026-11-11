const url = "https://rickandmortyapi.com/api/character/1";

async function main() {
  try {
    console.log("Consultando Rick and Morty API...");

    const respuesta = await fetch(url);

    console.log("Codigo HTTP:", respuesta.status);

    if (!respuesta.ok) {
      console.log("Error: el personaje no existe.");
      return;
    }

    const personaje = await respuesta.json();

    console.log("ID:", personaje.id);
    console.log("Nombre:", personaje.name);
    console.log("Estado:", personaje.status);
    console.log("Especie:", personaje.species);
    console.log("Origen:", personaje.origin.name);
    console.log("Ubicacion:", personaje.location.name);
  } catch (error) {
    console.log("Error de conexion:", error.message);
  }
}

main();