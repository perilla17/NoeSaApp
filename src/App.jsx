import { useState } from 'react'
import ListaArtistas from './components/ListaArtistas.jsx'
import FormularioArtista from './components/FormularioArtista.jsx'
import FormularioPresentacion from './components/FormularioPresentacion.jsx'
import ListaPresentaciones from './components/ListaPresentaciones.jsx'
import ConsultaPorArtista from './components/ConsultaPorArtista.jsx'
import Navbar from './components/Navbar.jsx'
import useListado from './hooks/useListado.js'
import { getArtistas } from './services/artistasService.js'

export default function App() {
  const artistas = useListado(getArtistas)
  const [versionAgenda, setVersionAgenda] = useState(0)
  const [artistaConsultaId, setArtistaConsultaId] = useState('')

  return (
    <>
      <Navbar />
      <main className="container" id="inicio">
        <section className="hero">
          <p className="etiqueta-seccion">FESTIAPP · FESTIVAL MUSICAL</p>
          <h1>La música encuentra su escenario.</h1>
          <p className="bajada">Organiza artistas y descubre la programación de cada presentación.</p>
          <a className="boton boton-hero" href="#programacion">Explorar programación <span aria-hidden="true">↓</span></a>
        </section>

        {/* Módulo de artistas (Integrante 1) */}
        <div className="grid-artistas">
          <FormularioArtista onArtistaCreado={artistas.recargar} />
          <ListaArtistas {...artistas} />
        </div>

        <section className="seccion-programacion" id="programacion" aria-labelledby="programacion-title">
          <div className="titulo-seccion">
            <div><p className="etiqueta-seccion">PLANEA CADA MOMENTO</p><h2 id="programacion-title">Programación</h2></div>
          </div>
          <div className="programacion">
            <FormularioPresentacion artistas={artistas} onCreada={() => setVersionAgenda(n => n + 1)} />
            <ListaPresentaciones artistas={artistas.datos} version={versionAgenda}
              onCambio={() => setVersionAgenda(n => n + 1)} />
          </div>
        </section>
        <ConsultaPorArtista
          artistas={artistas.datos}
          artistaId={artistaConsultaId}
          onArtistaChange={setArtistaConsultaId}
          version={versionAgenda}
        />
      </main>
      <footer className="site-footer"><div className="container">NoeSaApp <span>·</span> Cada artista, su momento.</div></footer>
    </>
  )
}
