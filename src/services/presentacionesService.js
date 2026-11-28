import { request } from './api.js'

const recurso = '/presentaciones'

export function getPresentaciones() {
  return request(recurso)
}

export function crearPresentacion(datos) {
  return request(recurso, { method: 'POST', body: JSON.stringify(datos) })
}

export function eliminarPresentacion(id) {
  return request(`${recurso}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
