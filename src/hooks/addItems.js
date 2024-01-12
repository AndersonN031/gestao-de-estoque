import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import dayjs from "dayjs"


export default function AddItems() {
  // utilizando o stado lisItems para criar um localStorage
  const [listItems, setListItems] = useState(() => {
    const storedItems = localStorage.getItem('item-storage');
    if (!storedItems) return [];
    return JSON.parse(storedItems);
  });

  // estados da área administrativa [nome, qnt, preço, categoria]
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  // arrow function handlSubmit para enviar todas informações que estão dentro dele para o servidor
  // Ele está no button "salvar", localizado no arquivo NewItems.jsx
  const handleSubmit = (ev) => {
    ev.preventDefault();
    try {
      // const generatedId = uuidv4()
      const currentDate = dayjs().format()
      const newProduct = {
        name,
        quantity,
        price,
        category,
        description,
        date: currentDate
      };
      alert('Item cadastrado com sucesso!')
      addItem(newProduct);
      setName("");
      setQuantity(0)
      setPrice(0)
      setCategory("")
      setDescription("")
      setDate("")

    } catch (error) {
      console.log(error.message)
    }
  };


  class StockItem {
    constructor(name, quantity, price, category, description, date) {
      this.id = uuidv4()
      this.name = name;
      this.quantity = +quantity;
      this.price = +price;
      this.category = category;
      this.description = description;
      this.date = date;
      this.#validate()
    }

    #validate() {
      const validName = typeof this.name === "string"
      const validQuantity = typeof this.quantity === "number" && Number.isInteger(this.quantity)
      const validPrice = typeof this.price === "number"
      const validCategory = typeof this.category === "string"
      const validDescription = typeof this.description === "string"
      const validDate = typeof this.date === "string"

      if (!(validName && validQuantity && validPrice && validCategory && validDescription && validDate)) {
        throw new Error("Invalid item!")
      }
    }
  }
  // arrow function para pegar o valor dos inputs e guardar no localStorage...
  const addItem = ({ name, quantity, price, category, description, date }) => {
    try {
      const newItem = new StockItem(name, quantity, price, category, description, date);
      setListItems((state) => {
        const newState = [newItem, ...state];
        localStorage.setItem('item-storage', JSON.stringify(newState));
        console.log(newState); // Adicione este log para verificar os itens
        return newState;
      });
    } catch (error) {
      console.error(error.message)
    }
  };


  const removeProduct = (productId) => {
    const itemName = listItems.find(item => item.id === productId)
    if (confirm(`Deseja remover o item ${itemName.name}?`)) {
      const newState = listItems.filter(item => item.id != productId)
      setListItems(newState)
      localStorage.setItem('item-storage', JSON.stringify(newState))
      alert(`O item ${itemName.name} foi removido com sucesso!`)
    }
  }

  return {
    listItems,
    setListItems,
    name,
    setName,
    handleSubmit,
    addItem,
    setQuantity,
    quantity,
    price,
    setPrice,
    category,
    setCategory,
    description,
    setDescription,
    removeProduct,
    date,
    setDate,
    StockItem
  };
}