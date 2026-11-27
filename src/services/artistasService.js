import { request } from './api.js'

// GET /artistas
export function getArtistas() {
  return request('/artistas')
}

// POST /artistas  -> { nombre, genero, pais }
export function crearArtista(artista) {
  return request('/artistas', {
    method: 'POST',
    body: JSON.stringify(artista),
  })
}
