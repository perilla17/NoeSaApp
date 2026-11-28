export default function ListaArtistas({ datos: artistas, cargando, error, recargar }) {
  return (
    <section className="panel" aria-labelledby="lista-artistas-title">
      <h2 id="lista-artistas-title">Artistas del festival</h2>

      {cargando && <p className="estado">Cargando artistas…</p>}

      {error && (
        <div className="mensaje mensaje-error" role="alert">
          <p>{error}</p>
          <button type="button" className="boton boton-secundario" onClick={recargar}>
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
