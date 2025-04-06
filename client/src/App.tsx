import Header from "./components/Header";
import Footer from "./components/Footer";
import { Home } from "./pages";
import { Button, Carousel, Divider, Drawer, Image, Loading } from "./components";
import { Categories, DishCard } from "./components/user/index.ts";
import { useEffect, useRef, useState } from "react";
import { getAllDishes } from "./api/dish.ts";
import { getAllCategories } from "./api/category.ts";
// import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
export const socket = io('http://localhost:3000');


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
    <div className="overflow-auto scrollbar-hide">
      {/* Just commented out for now, it's socket related stuff */}
      {/* <div>
          <input className="input border" value={message} onChange={handleChange} />
          <button onClick={handleSubmit}>Send</button>
        </div> */}
      <Header />
      <Home />
      <Footer />
      {/* <Hero /> */}
    </div>
  );
}

export default App;
