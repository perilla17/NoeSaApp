import { useCallback } from 'react'
import useListado from '../hooks/useListado.js'
import { getPresentacionesPorArtista } from '../services/presentacionesService.js'

export default function ConsultaPorArtista({ artistas, artistaId, onArtistaChange, version = 0 }) {
  const consultar = useCallback(
    () => getPresentacionesPorArtista(artistaId),
    [artistaId],
  )
  const { datos, cargando, error, recargar } = useListado(consultar, version)
  const artista = artistas.find((item) => String(item.id) === String(artistaId))

  return (
    <section className="panel panel-consulta" aria-labelledby="consulta-artista-title">
      <div className="encabezado-consulta">
        <div>
          <p className="etiqueta-seccion">AGENDA PERSONALIZADA</p>
          <h2 id="consulta-artista-title">Consulta por artista</h2>
        </div>
        <span className="contador-consulta" aria-label={`${datos.length} presentaciones`}>
          {datos.length} {datos.length === 1 ? 'presentación' : 'presentaciones'}
        </span>
      </div>
      <label className="campo" htmlFor="consulta-artista">
        Elige un artista
        <select id="consulta-artista" value={artistaId} onChange={(event) => onArtistaChange(event.target.value)}>
          <option value="">Selecciona un artista</option>
          {artistas.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
      </label>

      {!artistaId && <p className="estado">Selecciona un artista para consultar sus presentaciones.</p>}
      {artistaId && cargando && <p className="estado" role="status">Buscando presentaciones…</p>}
      {artistaId && error && <div className="mensaje mensaje-error" role="alert">
        <p>{error}</p>
        <button type="button" className="boton boton-secundario" onClick={recargar}>Reintentar</button>
      </div>}
      {artistaId && !cargando && !error && datos.length === 0 && (
        <p className="estado">{artista ? `${artista.nombre} aún no tiene presentaciones programadas.` : 'No se encontraron presentaciones para este artista.'}</p>
      )}
      {artistaId && !cargando && !error && datos.length > 0 && (
        <ul className="lista-consulta">
          {[...datos].sort((a, b) => (a.fecha || '').localeCompare(b.fecha || '') || (a.hora || '').localeCompare(b.hora || '')).map((presentacion) => (
            <li key={presentacion.id}>
              <span className="fecha-consulta">{presentacion.fecha ? presentacion.fecha.split('-').reverse().join('/') : 'Por confirmar'}</span>
              <div>
                <strong>{presentacion.escenario}</strong>
                <span>{presentacion.hora || 'Hora por confirmar'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
