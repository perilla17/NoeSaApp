import { useState } from 'react'
import useListado from '../hooks/useListado.js'
import { eliminarPresentacion, getPresentaciones } from '../services/presentacionesService.js'

export default function ListaPresentaciones({ artistas, version, onCambio }) {
  const { datos, cargando, error, recargar } = useListado(getPresentaciones, version)
  const [seleccionada, setSeleccionada] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [mensaje, setMensaje] = useState(null)
  const nombres = new Map(artistas.map(a => [String(a.id), a.nombre]))
  const ordenadas = [...datos].sort((a, b) =>
    (a.fecha || '9999-99-99').localeCompare(b.fecha || '9999-99-99') ||
    (a.hora || '99:99').localeCompare(b.hora || '99:99'))

  function confirmarFila(id) {
    setSeleccionada(id)
    setMensaje(null)
  }

  async function eliminar(presentacion, nombre) {
    if (eliminando) return
    setEliminando(true)
    setMensaje(null)
    try {
      await eliminarPresentacion(presentacion.id)
      setSeleccionada(null)
      setMensaje({ tipo: 'exito', texto: `Se eliminó la presentación de ${nombre} en ${presentacion.escenario}.` })
      onCambio?.()
      recargar()
    } catch (e) {
      setMensaje({ tipo: 'error', texto: e.message })
    } finally {
      setEliminando(false)
    }
  }

  return (
    <section className="panel panel-agenda" aria-labelledby="agenda-title">
      <h2 id="agenda-title">Agenda del festival</h2>
      {mensaje && <p role={mensaje.tipo === 'error' ? 'alert' : 'status'}
        className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>}
      {cargando && <p role="status">Cargando presentaciones…</p>}
      {error && <div className="mensaje mensaje-error" role="alert">
        <p>{error}</p>
        <button type="button" className="boton boton-secundario" onClick={recargar}>Reintentar</button>
      </div>}
      {!cargando && !error && !datos.length && <p>Todavía no hay presentaciones programadas.</p>}
      {!cargando && !error && datos.length > 0 && (
        <ul className="lista-agenda">
          {ordenadas.map(p => {
            const nombre = nombres.get(String(p.artistaId)) ?? `Artista #${p.artistaId}`
            return (
              <li key={p.id}>
                <div>
                  <strong>{nombre}</strong>
                  <span>{p.escenario}</span>
                  <span>{p.fecha ? p.fecha.split('-').reverse().join('/') : 'Fecha por confirmar'} · {p.hora || 'Hora por confirmar'}</span>
                </div>
                {seleccionada === p.id ? (
                  <div className="confirmar-agenda">
                    <span>¿Eliminar esta presentación?</span>
                    <div>
                      <button type="button" className="accion-eliminar" disabled={eliminando}
                        onClick={() => eliminar(p, nombre)}>{eliminando ? 'Eliminando…' : 'Sí, eliminar'}</button>
                      <button type="button" className="accion-cancelar" disabled={eliminando}
                        onClick={() => confirmarFila(null)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <button type="button" className="accion-eliminar" disabled={eliminando}
                    onClick={() => confirmarFila(p.id)}
                    aria-label={`Eliminar presentación de ${nombre} en ${p.escenario}`}>Eliminar</button>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
