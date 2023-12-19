import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AddItems from "../hooks/addItems"
import dayjs from "dayjs"

export default function Home() {
  const [diversityItems, setDiversityItems] = useState(0)
  const [totalInventory, setTotalInventory] = useState(0)
  const [itemsEnding, setItemsEnding] = useState(0)
  const [productsEnding, setProductsEnding] = useState([])
  const [recentItems, setRecentItems] = useState(0)

  const { listItems } = AddItems()

  // chamando os produtos no database.json

  // contador diversidade de itens e do inventário total
  const handleCount = () => {
    const countItems = new Set()
    let totalQuantity = 0
    let itemsRunningOut = 0

    // laço de repetição para filtrar e contar quantos tipos de produtos existem e quantos produtos tem no total
    for (let i = 0; i < listItems.length; i++) {
      countItems.add(listItems[i].id)
      totalQuantity += +listItems[i].quantity // passando listItems para number utilizando o sinal de +...


      // verificando se a quantidade do produto for menor que 2 então vai para o painel de "itens acabando"
      if (listItems[i].quantity <= 10) {
        itemsRunningOut++;
      }
    }


    setDiversityItems(countItems.size)
    setTotalInventory(totalQuantity)
    setItemsEnding(itemsRunningOut)

  }

  const calculateRecentItems = () => {
    const sevenDaysAgo = dayjs().subtract(24, 'hours')
    const recentItems = listItems.filter((item) => dayjs(item.date).isAfter(sevenDaysAgo))
    console.log(recentItems)
    setRecentItems(recentItems.length)
  }

  useEffect(() => {
    // filtrando produtos que estão acabando e retornando a quantidade de produto que estão abaixo de 2 quantidades...
    const endingProducts = listItems.filter(product => product.quantity <= 2)

    handleCount()
    setProductsEnding(endingProducts)
    calculateRecentItems()
  }, [listItems])

  return (
    <>
      <p className="dashboard-title">Dashboard</p>
      <div className="dashboard-status">

        <div className="dashboard-items">
          <p>Diversidade de itens</p>
          <h1>{diversityItems}</h1>
        </div>

        <div className="dashboard-total">
          <p>Inventário total</p>
          <h1>{totalInventory}</h1>
        </div>

        <div className="dashboard-recent">
          <p>Itens recentes</p>
          <h1>{recentItems}</h1>
        </div>

        <div className="dashboard-ending">
          <p>Itens acabando</p>
          <h1>{itemsEnding}</h1>
        </div>

      </div>

      <section>

        <div className="section-one">
          <div className="table-container-one">
            <table>
              <thead>
                <tr>
                  <th className="th-edit">Itens Recentes</th>
                  <th className="th-edit">Ações</th>
                </tr>
              </thead>
              <tbody>
                {listItems.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <Link to={`/products/${product.id}`}>
                        <button className="btn-one">Ver</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-two">
          <div className="table-container-two">
            <table>
              <thead>
                <tr>
                  <th>Itens acabando</th>
                  <th>qnt.</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {listItems.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <Link to={`/products/${product.id}`}>
                        <button className="btn-two">Ver</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}