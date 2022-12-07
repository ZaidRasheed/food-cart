import styles from './cart.module.css'
import Modal from '../ui/Modal/Modal';
import { CartData, Items } from '../../Context/CartContext'
import CartItem from './CartItem/CartItem'
import CheckOutForm from '../checkOutForm/CheckoutForm'
import { useEffect, useRef, useState } from 'react';


type Props = {
  closeCart: () => void,
}

export type OrderData = {
  items: Items[]
  fullName: string
  street: string
  postalCode: string
  city: string
  total: number
}


export default function Cart(props: Props) {

  const formRef = useRef<HTMLFormElement>(null)

  const { total, items, emptyCart } = CartData()

  const [showCheckOut, setShowCheckOut] = useState<boolean>(false)

  const [sending, setSending] = useState<boolean>(false)
  const [sent, setSent] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleShowCheckout = () => {
    if (items.length) {
      setShowCheckOut(true)
      setTimeout(() => { formRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 200)
    }
  }
  const handleCloseCheckout = () => {
    setShowCheckOut(false)
  }

  useEffect(() => {
    if (items.length === 0) {
      setShowCheckOut(false)
    }
  }, [items.length])

  const sendOrder = (data: OrderData) => {
    const finalData = {
      items: data.items,
      fullName: data.fullName,
      street: data.street,
      postalCode: data.postalCode,
      city: data.city,
      total: data.total.toFixed(2)
    }

    setSending(true)

    fetch(import.meta.env.VITE_API_URL + '/ORDERS.json', {
      method: 'POST',
      body: JSON.stringify(finalData)
    })
      .then(res => res.json())
      .then(data => {
        if (data?.name) {
          setSent(true)
          emptyCart()
        }
        else throw new Error()
      })
      .catch((error) => {
        setSending(false)
        setError('Unable to send order')
      })
  }

  const cartItems = (
    <ul className={styles['cart-items']}>
      {items.map((item, i) => (
        <CartItem
          key={i}
          item={item}
        />
      ))}
    </ul>
  );

  return (
    <Modal
      closeCart={props.closeCart}
    >
      {
        error ?
          <h3 style={{ fontSize: '1.5rem', color: 'red' }}>{error}</h3>
          :
          sent
            ?
            <h3 style={{ fontSize: '1.5rem', color: 'green' }}>Order Sent</h3>
            :
            sending
              ?
              <h3 style={{ fontSize: '1.5rem' }}>Sending...</h3>
              :
              <>
                {cartItems}
                <div className={styles.total}>
                  <span>Total Amount</span>
                  <span>{total > 0 ? total.toFixed(2) : 0}$ </span>
                </div>
                {
                  showCheckOut && items.length > 0 ?
                    <CheckOutForm
                      ref={formRef}
                      sendOrder={sendOrder}
                      handleCloseCheckout={handleCloseCheckout}
                      error={error}
                    /> : <></>
                }
                {!showCheckOut ? <div className={styles.actions}>
                  <button className={styles['button--alt']} onClick={() => { props.closeCart() }}>Close</button>
                  <button className={styles.button} onClick={handleShowCheckout}>Check Out</button>
                </div> : <></>}
              </>
      }
    </Modal >
  );
}
