import { Link } from "react-router-dom";
import AddItems from "../hooks/addItems";
import dayjs from "dayjs"
import { useState } from "react";
export default function Product() {
  const { listItems, removeProduct } = AddItems()
  const [isEditing, setIsEditing] = useState(false)

  // retorna o cominho da URL ("/products/id_do_produto") da página atual.
  // Assim, window.location.pathname.split("/")[2] extrai o ID do produto da URL.
  const productId = window.location.pathname.split("/")[2] // ["", "products", "123"] A parte que nos interessa é o terceiro elemento (123)

  // utiliza o ID para encontrar o objeto correspondente na lista de itens('listItems').  A função find percorre a lista e retornar o primeiro item cujo ID, convertido para uma string, corresponda ao ID da URL (productId).
  const product = listItems.find((item) => item.id.toString() === productId)

  const formatedDate = (date) => {
    return dayjs(date, "DD/MM/YYYY").format("DD/MM/YYYY, HH:mm")

  }

  const handleUpdateClick = () => {
    setIsEditing(true)
  }



  return (
    <>
      <h1 className="title-stock">Stock Items</h1>

      <div className="links-products">

        <Link to="/totalItems">
          <button className="btn-totalitems">Todos os itens</button>
        </Link>

        <Link to="/newItems">
          <button className="btn-newitems">Novo item</button>
        </Link>

      </div>

      <hr className="hr-items" />

      <section className="section-pagindividual">

        <div className="pag-item">
          <h2 className="title-stock">{product.name}</h2>
          <>
            <Link to={`/update/${product.id}`}>
              <button className="btn-att" onClick={handleUpdateClick}>Atualizar</button>
            </Link>

            <Link to={`/totalItems`}>
              <button
                className="btn-delete"
                onClick={() => removeProduct(product.id)}
              >Excluir</button>
            </Link>
          </>
        </div>

        <div className="status-item">
          <p>Categoria:  {product.category}</p>
          <p>Quantidade em estoque: {product.quantity}</p>
          <p>Preço: R${product.price}</p>
        </div>

        <p>{product.description}</p>

        <div className="date-group">
          <p>Cadastrado em: {formatedDate(product.date)}</p>
          <p className="att-date">Atualizado em: {product.updateDate ? formatedDate(product.updateDate) : ''}</p>
        </div>
      </section>
    </>
  )
}