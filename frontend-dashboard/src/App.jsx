import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Uebersicht from './pages/Uebersicht'
import Login from './pages/Login'
import Detail from './pages/Detail'
import Edit from './pages/Edit'
import { Route, Routes } from 'react-router-dom'
import { ProjektProvider } from './ProjektContext'

function App() {


  return (
    <>
     <header>
      <h1>Aktuelle Baustellen informationen</h1>
     </header>
     <Navbar />
     <ProjektProvider>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uebersicht" element={<Uebersicht />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:projektnummer" element={<Detail />} />
          <Route path="/edit/:projektnummer" element={<Edit />} />
        </Routes>
      </main>
      </ProjektProvider>
    </>
  )
}

export default App
