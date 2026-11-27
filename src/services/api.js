// Configuración compartida de la API (JSON Server).
// Todos los servicios (artistas, presentaciones) usan esta función.
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export async function request(path, options = {}) {
  let respuesta
  try {
    respuesta = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    // fetch solo lanza error cuando no hay conexión con el servidor
    throw new Error(
      'No se pudo conectar con la API. Verifica que JSON Server esté corriendo (npm run api).',
    )
  }

  if (!respuesta.ok) {
    throw new Error(`La API respondió con error ${respuesta.status}.`)
  }

  return respuesta.json()
}
