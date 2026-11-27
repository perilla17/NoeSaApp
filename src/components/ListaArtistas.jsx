import { useEffect, useState } from 'react'
import { getArtistas } from '../services/artistasService.js'

// recarga: número que el padre incrementa para volver a pedir los artistas
// (por ejemplo, después de registrar uno nuevo).
export default function ListaArtistas({ recarga = 0 }) {
  const [artistas, setArtistas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const datos = await getArtistas()
        if (activo) setArtistas(datos)
      } catch (e) {
        if (activo) setError(e.message)
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargar()
    return () => { activo = false }
  }, [recarga, intento])

  return (
    <section className="panel" aria-labelledby="lista-artistas-title">
      <h2 id="lista-artistas-title">Artistas del festival</h2>

      {cargando && <p className="estado">Cargando artistas…</p>}

      {error && (
        <div className="mensaje mensaje-error" role="alert">
          <p>{error}</p>
          <button type="button" className="boton boton-secundario" onClick={() => setIntento((n) => n + 1)}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && artistas.length === 0 && (
        <p className="estado">Aún no hay artistas registrados.</p>
      )}

      {!error && artistas.length > 0 && (
        <ul className="lista-artistas">
          {artistas.map((a) => (
            <li key={a.id} className="tarjeta-artista">
              <strong>{a.nombre}</strong>
              <span>{a.genero}</span>
              <span className="pais">{a.pais}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
