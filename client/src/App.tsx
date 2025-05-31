import Header from "./components/user/Header";
import Footer from "./components/Footer";
import { Home } from "./pages";
import {io} from 'socket.io-client';
export const socket = io('http://localhost:3000');


function App() {

  return (
    <div className="overflow-auto scrollbar-hide">
     
      <Header />
      <Home />
      <Footer />
     
    </div>
  );
}

export default App;
