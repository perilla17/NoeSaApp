import { useState } from 'react'
import { crearArtista } from '../services/artistasService.js'

const VACIO = { nombre: '', genero: '', pais: '' }

const GENEROS_SUGERIDOS = [
  'Rock', 'Pop', 'Electrónica', 'Hip hop', 'Reggaetón', 'Salsa', 'Vallenato', 'Jazz', 'Folk',
]

function validar(valores) {
  const errores = {}
  if (!valores.nombre.trim()) errores.nombre = 'El nombre es obligatorio.'
  else if (valores.nombre.trim().length < 2) errores.nombre = 'El nombre debe tener al menos 2 caracteres.'
  if (!valores.genero.trim()) errores.genero = 'El género musical es obligatorio.'
  if (!valores.pais.trim()) errores.pais = 'El país es obligatorio.'
  return errores
}

// onArtistaCreado: función que el padre (App) usa para recargar el listado.
export default function FormularioArtista({ onArtistaCreado }) {
  const [valores, setValores] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(null) // { tipo: 'exito' | 'error', texto }
  const [enviando, setEnviando] = useState(false)

  function manejarCambio(e) {
    const { name, value } = e.target
    setValores((actual) => ({ ...actual, [name]: value }))
    setErrores((actual) => ({ ...actual, [name]: undefined }))
    setMensaje(null)
  }

  async function manejarEnvio(e) {
    e.preventDefault()
    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) {
      setMensaje({ tipo: 'error', texto: 'Revisa los campos marcados antes de guardar.' })
      return
    }

    setEnviando(true)
    try {
      const artista = await crearArtista({
        nombre: valores.nombre.trim(),
        genero: valores.genero.trim(),
        pais: valores.pais.trim(),
      })
      setMensaje({ tipo: 'exito', texto: `Artista "${artista.nombre}" registrado correctamente.` })
      setValores(VACIO)
      onArtistaCreado?.(artista)
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="panel" aria-labelledby="form-artista-title">
      <h2 id="form-artista-title">Registrar artista</h2>

      <form onSubmit={manejarEnvio} noValidate className="formulario">
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" value={valores.nombre}
            onChange={manejarCambio} aria-invalid={Boolean(errores.nombre)} />
          {errores.nombre && <small className="campo-error">{errores.nombre}</small>}
        </div>

        <div className="campo">
          <label htmlFor="genero">Género musical</label>
          <input id="genero" name="genero" type="text" list="generos" value={valores.genero}
            onChange={manejarCambio} aria-invalid={Boolean(errores.genero)} />
          <datalist id="generos">
            {GENEROS_SUGERIDOS.map((g) => <option key={g} value={g} />)}
          </datalist>
          {errores.genero && <small className="campo-error">{errores.genero}</small>}
        </div>

        <div className="campo">
          <label htmlFor="pais">País</label>
          <input id="pais" name="pais" type="text" value={valores.pais}
            onChange={manejarCambio} aria-invalid={Boolean(errores.pais)} />
          {errores.pais && <small className="campo-error">{errores.pais}</small>}
        </div>

        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? 'Guardando…' : 'Guardar artista'}
        </button>
      </form>

      {mensaje && (
        <p className={`mensaje mensaje-${mensaje.tipo}`} role={mensaje.tipo === 'error' ? 'alert' : 'status'}>
          {mensaje.texto}
        </p>
      )}
    </section>
  )
}
