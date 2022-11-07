import styles from './mealItem.module.css'
import Input from '../../ui/Input/Input'
import { CartData } from '../../../Context/CartContext'
import { useRef, useState, MouseEvent } from 'react';

type Props = {
    id: string,
    name: string,
    description: string,
    price: number
};

export default function MealItem(props: Props) {

    const [error, setError] = useState<boolean>(false)
    const amount = useRef<HTMLInputElement>(null)

    const { addItem } = CartData();
    const price = `${props.price.toFixed(2)}$`

    const handleAdd = (e: MouseEvent) => {
        e.preventDefault()
        setError(false)


        if (+amount.current?.value! < 1) {
            return setError(true)
        }

        addItem({
            id: props.id,
            name: props.name,
            description: props.description,
            price: props.price
        }, +amount.current?.value!)
    }


    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <form className={styles.form}>
                <Input
                    ref={amount}
                    label='Amount'
                    input={{
                        id: 'amount_' + props.id,
                        type: 'number',
                        min: '1',
                        max: '5',
                        step: '1',
                        defaultValue: '1',
                    }}
                />
                <button onClick={handleAdd}>+ Add</button>
                {error && <p>Invalid Input</p>}
            </form>
        </li>
    )
}
