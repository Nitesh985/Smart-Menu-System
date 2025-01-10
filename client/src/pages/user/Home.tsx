import { Link } from "react-router-dom";
import { CartButton, HomeComponent } from "../../components"


function Home() {
  return (
    <>
      <HomeComponent />
      <Link to="./orders"  >
        <CartButton />
      </Link>
    </>
  )
}

export default Home