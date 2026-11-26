export default function App() {
  return (
    <>
      <header className="site-header">
        <div className="container wordmark">
          <span className="equalizer" aria-hidden="true"><i /><i /><i /><i /></span>
          FestiApp
        </div>
      </header>
      <main className="container">
        <h1>Presentaciones</h1>
        <section className="agenda" aria-labelledby="agenda-title">
          <h2 id="agenda-title">Agenda del festival</h2>
          <p>Aquí podrás consultar los artistas, escenarios y horarios cuando se conecte la API.</p>
        </section>
      </main>
    </>
  )
}
