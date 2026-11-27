import { useState } from 'react'
import ListaArtistas from './components/ListaArtistas.jsx'
import FormularioArtista from './components/FormularioArtista.jsx'

export default function App() {
  // Cada vez que se registra un artista, se incrementa para recargar el listado.
  const [recargaArtistas, setRecargaArtistas] = useState(0)

  return (
    <>
      <header className="site-header">
        <div className="container wordmark">
          <span className="equalizer" aria-hidden="true"><i /><i /><i /><i /></span>
          NoeSaApp
        </div>
      </header>
      <main className="container">
        <h1>Presentaciones</h1>

        {/* Módulo de artistas (Integrante 1) */}
        <div className="grid-artistas">
          <FormularioArtista onArtistaCreado={() => setRecargaArtistas((n) => n + 1)} />
          <ListaArtistas recarga={recargaArtistas} />
        </div>

        <section className="agenda" aria-labelledby="agenda-title">
          <h2 id="agenda-title">Agenda del festival</h2>
          <p>Aquí podrás consultar los artistas, escenarios y horarios cuando se conecte la API.</p>
        </section>
      </main>
    </>
  )
}
