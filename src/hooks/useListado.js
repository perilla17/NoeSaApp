import { useEffect, useState } from 'react'

// Descarta las respuestas anteriores cuando se vuelve a consultar el recurso.
export default function useListado(consultar, version = 0) {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let vigente = true
    setCargando(true)
    setError('')

    async function cargar() {
      try {
        const listado = await consultar()
        if (vigente) setDatos(listado)
      } catch (e) {
        if (vigente) setError(e.message)
      } finally {
        if (vigente) setCargando(false)
      }
    }

    cargar()
    return () => { vigente = false }
  }, [consultar, intento, version])

  return { datos, cargando, error, recargar: () => setIntento(n => n + 1) }
}
