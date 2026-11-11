const BASE_URL = "https://rickandmortyapi.com/api";

async function pedir(ruta) {
  const respuesta = await fetch(BASE_URL + ruta);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }

  return respuesta.json();
}

export function obtenerPersonaje(id) {
  return pedir(`/character/${id}`);
}

export function listarPersonajes(pagina = 1) {
  return pedir(`/character?page=${pagina}`);
}