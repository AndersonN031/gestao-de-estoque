import { Link } from "react-router-dom";
import AddItems from "../hooks/addItems";
import Header from "../components/Header";


export default function NewItems() {
  const { handleSubmit, name, setName, quantity, setQuantity, price, setPrice, category, setCategory, description, setDescription } = AddItems()

  const formatPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })

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
      <section className="section-newItem">

        <div className="main-container-newItem">
          <div className="container-newItem">

            <div className="div-newItem">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            </div>

            {/* Quantidade de itens adicionados */}
            <div className="div-newItem">
              <label htmlFor="quantidade">Quantidade</label>
              <input
                type="number"
                name="qnt"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Preço dos itens... */}
            <div className="div-newItem">
              <label htmlFor="preço">Preço</label>
              <input
                type="number"
                name="preço"
                placeholder="0"
                value={formatPrice}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Categoria de itens... */}
            <div className="div-newItem">

              <label htmlFor="categoria">Categoria</label>
              <select
                name="categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled={!category}>Selecione a categoria </option>
                <option value="tecnologia">Tecnologia</option>
                <option value="livros">Livros</option>
                <option value="limpeza">Limpeza</option>
              </select>

            </div>

          </div>

          {/* Descrição de um item */}
          <div className="textarea-newItem">
            <label htmlFor="descrição">Descrição</label>
            <textarea
              name="area de texto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="newItem-button">
              <button onClick={handleSubmit}>Salvar</button>
            </div>

          </div>

        </div>

      </section>
    </>
  )

}