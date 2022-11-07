import { useState } from 'react'
import './app.css'
import Header from "./components/layout/Header"
import Meals from './components/meals/Meals'
import Cart from './components/cart/Cart'
import { CartProvider } from './Context/CartContext'
function App() {

  const [showCart, setShowCart] = useState(false)
  const closeCart = () => {
    setShowCart(false)
  }
  const openCart = () => {
    setShowCart(true)
  }

  return (
    <CartProvider>
      {
        showCart ?
          <Cart
            closeCart={closeCart}
          />
          : <></>
      }
      <Header
        openCart={openCart}
      />
      <Meals />
    </CartProvider>
  )
}

export default App
