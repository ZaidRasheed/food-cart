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
export default function ({ item }: Props) {

  const { addItem, removeItem } = CartData()

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
    }, 1)
  }

  const handleRemove = () => {
    removeItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
    }, 1)
  }
  const handleRemoveAll = () => {
    removeItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
    }, -1)
  }

  const price = `$${item.price.toFixed(2)}`;

  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x{item.amount}</span>
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

