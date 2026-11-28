import { useState } from 'react'
import { crearPresentacion } from '../services/presentacionesService.js'

const inicial = { artistaId: '', escenario: '', fecha: '', hora: '' }

export default function FormularioPresentacion({ artistas, onCreada }) {
  const [campos, setCampos] = useState(inicial)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState(null)
  const disponible = !artistas.cargando && !artistas.error && artistas.datos.length > 0

  function cambiar(evento) {
    const { name, value } = evento.target
    setCampos(actual => ({ ...actual, [name]: value }))
    setMensaje(null)
  }

  async function guardar(evento) {
    evento.preventDefault()
    if (guardando || !disponible) return
    const artista = artistas.datos.find(a => String(a.id) === campos.artistaId)
    const escenario = campos.escenario.trim()
    if (!artista || !escenario) {
      setMensaje({ tipo: 'error', texto: !artista ? 'Selecciona un artista registrado.' : 'Escribe el nombre del escenario.' })
      evento.currentTarget.elements[!artista ? 'artistaId' : 'escenario'].focus()
      return
    }

    setGuardando(true)
    setMensaje(null)
    try {
      // El selector entrega texto. El identificador de la API conserva su tipo original.
      await crearPresentacion({ artistaId: artista.id, escenario, fecha: campos.fecha, hora: campos.hora })
      setMensaje({ tipo: 'exito', texto: `Presentación de ${artista.nombre} registrada en ${escenario}.` })
      setCampos(inicial)
      onCreada()
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="panel panel-agenda" aria-labelledby="registro-actuacion">
      <h2 id="registro-actuacion">Registrar presentación</h2>
      {artistas.cargando && <p role="status">Cargando artistas…</p>}
      {artistas.error && <div role="alert" className="mensaje mensaje-error">
        <p>No se pudo cargar el selector de artistas.</p>
        <button type="button" className="boton boton-secundario" onClick={artistas.recargar}>Reintentar</button>
      </div>}
      {!artistas.cargando && !artistas.error && !artistas.datos.length &&
        <p role="status">Registra un artista para programar su primera presentación.</p>}

      <form onSubmit={guardar}>
        <fieldset className="campos-agenda" disabled={guardando || !disponible}>
          <div className="campo">
            <label htmlFor="artista-presentacion">Artista</label>
            <select id="artista-presentacion" name="artistaId" value={campos.artistaId} onChange={cambiar} required>
              <option value="">Selecciona un artista</option>
              {artistas.datos.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
          </div>
          <label className="campo">Escenario
            <input type="text" name="escenario" value={campos.escenario} onChange={cambiar} required />
          </label>
          <div className="fecha-hora">
            <label className="campo">Fecha
              <input type="date" name="fecha" value={campos.fecha} onChange={cambiar} required />
            </label>
            <label className="campo">Hora
              <input type="time" name="hora" value={campos.hora} onChange={cambiar} required />
            </label>
          </div>
          <button type="submit" className="boton">{guardando ? 'Guardando…' : 'Guardar presentación'}</button>
        </fieldset>
      </form>
      {mensaje && <p role={mensaje.tipo === 'error' ? 'alert' : 'status'}
        className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>}
    </section>
  )
}
