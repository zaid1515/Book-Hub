import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Navbar/>
          <Routes>

          </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
