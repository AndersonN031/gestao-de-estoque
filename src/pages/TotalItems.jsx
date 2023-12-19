import { Link } from "react-router-dom";
import AddItems from "../hooks/addItems";
import Header from "../components/Header";


export default function TotalItems() {
  const { listItems, removeProduct } = AddItems()
  return (
    <>
      <Header />
      <h1 className="title-stock">Stock Items</h1>
      <div className="links-products">
        <Link to="/totalItems">
          <button className="btn-totalitems">Todos os itens</button>
        </Link>
        <Link to="/newItems">
          <button className="btn-newitems">Novo item</button>
        </Link>
      </div>
      <hr className="hr-totalitems" />
      <section className="products">
        <table>
          <thead>
            <tr>
              <th className="titles-table">ID</th>
              <th className="titles-table">Nome</th>
              <th className="titles-table">Em estoque</th>
              <th className="titles-table">Categoria</th>
              <th className="titles-table">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td className="td-table">{product.category}</td>
                <div className="btn-group">
                  <Link to={`/products/${product.id}`}>
                    <button className="btn-details">Ver</button>
                  </Link>
                  <Link to={`/update/${product.id}`}><button className="btn-att">Atualizar</button></Link>
                  <button
                    className="btn-delete"
                    onClick={() => removeProduct(product.id)}
                  >Excluir</button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>

      </section>
    </>
  )
}