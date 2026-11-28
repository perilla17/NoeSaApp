import { request } from './api.js'

const recurso = '/presentaciones'

export function getPresentaciones() {
  return request(recurso)
}

// JSON Server aplica el filtro en la API, conservando artistaId como criterio.
export function getPresentacionesPorArtista(artistaId) {
  return request(`${recurso}?artistaId=${encodeURIComponent(artistaId)}`)
}

export function crearPresentacion(datos) {
  return request(recurso, { method: 'POST', body: JSON.stringify(datos) })
}

export function eliminarPresentacion(id) {
  return request(`${recurso}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
