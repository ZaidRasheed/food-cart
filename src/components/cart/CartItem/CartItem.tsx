import styles from './cartItem.module.css';
import { CartData } from '../../../Context/CartContext'

type Items = {
  id: string,
  name: string,
  description: string,
  price: number,
  amount: number
}
type Props = {
  item: Items
}
export default function (props: Props) {

  const { addItem, removeItem } = CartData()

  const handleAdd = () => {
    addItem({
      id: props.item.id,
      name: props.item.name,
      description: props.item.description,
      price: props.item.price,
    }, 1)
  }

  const handleRemove = () => {
    removeItem({
      id: props.item.id,
      name: props.item.name,
      description: props.item.description,
      price: props.item.price,
    }, 1)
  }
  const handleRemoveAll = () => {
    removeItem({
      id: props.item.id,
      name: props.item.name,
      description: props.item.description,
      price: props.item.price,
    }, -1)
  }

  const price = `$${props.item.price.toFixed(2)}`;

  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x{props.item.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={handleAdd}>+</button>
        <button onClick={handleRemove}>−</button>
        <button className={styles.remove} onClick={handleRemoveAll}>X</button>
      </div>
    </li>
  );
};

