import './App.css'
import logo from "./assets/logo.png"

function App() {

  return (
   <>
      <header>
        <nav>
          <h1><img src={logo} alt="" /></h1>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
   </>
  )
}

export default App
