import styles from './cart.module.css'
import Modal from '../ui/Modal/Modal';
import { CartData } from '../../Context/CartContext'
import CartItem from './CartItem/CartItem'
type Props = {
  closeCart: Function,
}

export default function Cart(props: Props) {
  const { total, items } = CartData()
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
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{total > 0 ? total.toFixed(2) : 0}$ </span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={() => { props.closeCart() }}>Close</button>
        {items.length > 0 && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
}
