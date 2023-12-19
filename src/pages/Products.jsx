import { Link } from "react-router-dom"

export default function Products() {

  return (
    <>
      <h1 className="title-stock">Stock Items</h1>
      <div className="links-products">
        <Link to="/totalItems">
          <button className="btn-totalitems">Todos os itens</button>
        </Link>
        <Link to="/newItems">
          <button className="btn-newitems">Novo Item</button>
        </Link>
      </div>
      <hr className="hr-products" />
      <div className="vac">
        <h1>...</h1>
      </div>
    </>
  )
}