const url = "https://pokeapi.co/api/v2/pokemon/pokemoninventado";
//const url = "https://pokeapi.co/api/v2/pokemon/pikachu";
async function main() {
  try {
    console.log("Consultando la API...");

    const respuesta = await fetch(url);

console.log("Codigo HTTP:", respuesta.status);

if (!respuesta.ok) {
  console.log("Error: el Pokemon no existe.");
  return;
}
    const datos = await respuesta.json();

    const tipos = datos.types
      .map((elemento) => elemento.type.name)
      .join(", ");

    console.log("Nombre:", datos.name);
    console.log("Altura:", datos.height / 10, "metros");
    console.log("Peso:", datos.weight / 10, "kilogramos");
    console.log("Tipos:", tipos);  
  } catch (error) {
    console.log("Error de conexi�n:", error.message);
  }
}

main();
