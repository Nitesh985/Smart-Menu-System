import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero.tsx'
// import { useEffect, useState } from 'react';
// import {io} from 'socket.io-client';
// const socket = io('http://localhost:3000');


function App() {
  // const [message, setMessage] = useState("")

  // useEffect(() => {
  //   socket.on('message', (message:any) => {
  //     console.log(message);
  //   });
  // }, []);

  // const handleSubmit = () => {
  //   socket.emit('client-message', message);
  //   setMessage('')
  // }

  // const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   setMessage(e.target.value)
    // }

  return (
   <>{/* Just commented out for now, it's socket related stuff */}
        {/* <div>
          <input className="input border" value={message} onChange={handleChange} />
          <button onClick={handleSubmit}>Send</button>
        </div> */}
        {/* <Header /> */}
        <Outlet />
        {/* <Hero /> */}
        {/* <Footer /> */}

   </>
  )
}

export default App
