import { useState } from "react";
import { Link } from "react-router-dom";
import AddItems from "../hooks/addItems";
import dayjs from "dayjs";

export default function UpdateProduct() {

  const { listItems, setListItems } = AddItems()

  const productId = window.location.pathname.split("/")[2]
  const product = listItems.find((item) => item.id.toString() === productId)

  const [editedName, setEditedName] = useState(product.name)
  const [editedQuantity, setEditedQuantity] = useState(product.quantity)
  const [editedPrice, setEditedPrice] = useState(product.price)
  const [editedCategory, setEditedCategory] = useState(product.category)
  const [editedDescription, setEditedDescription] = useState(product.description)
  const [updateDate, setUpdateDate] = useState(product.updateDate || dayjs().format("YYYY-MM-DDTHH:mm"))
  const [isEditing, setIsEditing] = useState(false)


  if (!product) {
    return (
      <h2>Oops... Esse produto não foi encontrado.</h2>
    )
  }


  // função para cancelar qualquer atualização do produto...
  const handleCancelEdit = () => {
    if (isEditing) {
      setIsEditing(false)

      // reset para o nome original se cancelado
      setEditedName(product.name)
      setEditedQuantity(product.quantity)
      setEditedPrice(product.price)
      setEditedCategory(product.category)
      setEditedDescription(product.description)

    }
  }

  const handleSaveEdit = () => {
    // atualiza o nome do produto
    const updatedProduct = { ...product, name: editedName, quantity: editedQuantity, price: editedPrice, category: editedCategory, description: editedDescription, updateDate: dayjs().format("YYYY-MM-DDTHH:mm") }

    // atualiza o item na lista de itens
    const updatedListItems = listItems.map((item) => item.id === updatedProduct.id ? updatedProduct : item)

    // atualiza o estado e o localstorage
    setListItems(updatedListItems)
    localStorage.setItem("item-storage", JSON.stringify(updatedListItems))
    setIsEditing(false)
    console.log(updatedProduct)

  }

  return (
    <>
      <div className="container-updateProduct">
        <div className="pag-item">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="input-name"
          />
          <input
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(e.target.value)}
            className="input-quantity"
          />
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            className="input-price"
          />
          <div className="div-newItem">
            <select
              name="categoria"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            >
              <option value="" disabled={!editedCategory}>Selecione a categoria </option>
              <option value="tecnologia">Tecnologia</option>
              <option value="livros">Livros</option>
              <option value="limpeza">Limpeza</option>
            </select>

          </div>

          {/* <input
            type="datetime-local"
            value={updateDate}
            onChange={(e) => setUpdateDate(e.target.value)}
          /> */}

        </div>
      </div>

      <div className="textarea-container">
        <textarea
          name="descrição"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="btn-groupUpdate">
        <Link to={`/products/${product.id}`} className="group-link">
          <button className="btn-save" onClick={handleSaveEdit}>Salvar Alterações</button>
          <button className="btn-cancel" onClick={handleCancelEdit}>Cancelar</button>
        </Link>
      </div>
    </>
  )

} 