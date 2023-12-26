import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/Loading/Loading'
import Home from './pages/Home/Home'
import Books from './pages/Books/Books'
import SingleBook from './pages/SingleBook/SingleBook'
import CreateBook from './pages/CreateBook/CreateBook'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/home'
            element={<Loading><Home /></Loading>}
          />
          <Route
            path='/books'
            element={<Books />}
          />
          <Route
            path='/books/:slug'
            element={<Loading><SingleBook /></Loading>}
          />
          <Route
           path='/create'
           element={ <Loading> <CreateBook/></Loading> }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
