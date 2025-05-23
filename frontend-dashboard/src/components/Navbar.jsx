import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/uebersicht" style={{ marginRight: '1rem' }}>Übersicht</Link>
      {/* <Link to="/neuer Eintrag">API Dokumentation</Link>   */}
      <Link to="http://localhost:8080/swagger-ui/index.html#" target="_blank">API Dokumentation</Link>
      <Link to="/login">Ausloggen <em>(Aellig Raffael, BVD-TBA-DLZ)</em></Link>
    </nav>
  )
}



export default Navbar