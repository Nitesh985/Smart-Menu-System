// import logo from "../../assets/logo.png";
import logo from '../../assets/web-logo.png'
// import pizzaLogo from '../../assets/pizzaLogo.png'
import pizzaLogo from '../../assets/pizzaLogoNobg.png'
import {Image, SearchBar} from "../index";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="p-4 flex justify-between items-center ">
      <Link to="/">
        <Image imageUrl={pizzaLogo} alt="web-logo" className='border rounded-full border-opacity-45 border-white'  />
      </Link>
      <div className="w-9/12" >
        <SearchBar/>
      </div>
    </header>
  );
}

export default Header;
