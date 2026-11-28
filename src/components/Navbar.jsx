export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="container navbar" aria-label="Navegación principal">
        <a className="wordmark" href="#inicio" aria-label="NoeSaApp, inicio">
          <span className="equalizer" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>NoeSa<span className="wordmark-acento">App</span></span>
        </a>
        <a className="enlace-nav" href="#programacion">Programación <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  )
}
