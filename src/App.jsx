import { useState } from 'react'
import ListaArtistas from './components/ListaArtistas.jsx'
import FormularioArtista from './components/FormularioArtista.jsx'
import FormularioPresentacion from './components/FormularioPresentacion.jsx'
import ListaPresentaciones from './components/ListaPresentaciones.jsx'
import useListado from './hooks/useListado.js'
import { getArtistas } from './services/artistasService.js'

export default function App() {
  const artistas = useListado(getArtistas)
  const [versionAgenda, setVersionAgenda] = useState(0)

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
          <FormularioArtista onArtistaCreado={artistas.recargar} />
          <ListaArtistas {...artistas} />
        </div>

        <div className="programacion">
          <FormularioPresentacion artistas={artistas} onCreada={() => setVersionAgenda(n => n + 1)} />
          <ListaPresentaciones artistas={artistas.datos} version={versionAgenda} />
        </div>
      </main>
    </>
  )
}
