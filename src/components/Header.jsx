import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <h2 className="name-storage">STOCK MASTER</h2>
        <div className="nav-links">
          <Link to={"/"} className='link'>Início</Link>
          <Link to={"/products"} className='link'>Produtos</Link>
        </div>
      </nav>
    </header>
  )
}