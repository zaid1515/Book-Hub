import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Books from './pages/Books/Books'

function App() {

  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/home' element={<Home />}/>
            <Route path='/books' element={<Books />}/>
          </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
