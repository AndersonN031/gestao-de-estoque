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
    const generatedId = uuidv4()
    const currentDate = dayjs().format()
    const newProduct = {
      id: generatedId,
      name,
      quantity,
      price,
      category,
      description,
      date: currentDate
    };

    addItem(newProduct);
    setName("");
    setQuantity(0)
    setPrice(0)
    setCategory("")
    setDescription("")
    setDate("")
  };

  // arrow function para pegar o valor dos inputs e guardar no localStorage...
  const addItem = ({ id, name, quantity, price, category, description, date }) => {
    const newItem = { id, name, quantity, price, category, description, date };

    setListItems((state) => {
      const newState = [newItem, ...state];
      localStorage.setItem('item-storage', JSON.stringify(newState));
      console.log(newState); // Adicione este log para verificar os itens
      return newState;
    });

  };
  const removeProduct = (productId) => {
    const newState = listItems.filter(item => item.id != productId)
    setListItems(newState)
    localStorage.setItem('item-storage', JSON.stringify(newState))

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
    setDate
  };
}