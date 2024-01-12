import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import TotalItems from "./pages/TotalItems";
import NewItems from "./pages/NewItems";
import UpdateProduct from "./pages/UpdateProduct";
// import AddItems from "./hooks/addItems";

// const addItemState = AddItems()

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products", element: <Products />,
        children: [
          { index: true, element: <TotalItems /> },
          { index: true, element: <NewItems /> }
        ]
      },
      { path: "products/:productId", element: <Product /> },
      { path: "update/:productId", element: <UpdateProduct /> }
    ]
  },
  {
    path: "totalItems",
    element: <TotalItems />
  },
  {
    path: "newItems",
    element: <NewItems />
  },
  {
    path: "/products",
    element: <Products />
  }
])

export default router