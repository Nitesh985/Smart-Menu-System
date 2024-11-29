import logo from "../../assets/logo.png"


function Header() {
  return (
    <header className="p-7 bg-slate-100">
        <nav>
          <div><img src={logo} alt="web-logo" className="w-[200px] h-[80px]" /></div>
        </nav>
      </header>
  )
}

export default Header