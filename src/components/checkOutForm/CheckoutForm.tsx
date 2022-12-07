import { FormEvent, useRef, useState, forwardRef } from 'react'
import styles from './checkoutForm.module.css'
import { CartData } from '../../Context/CartContext'
import { OrderData } from '../cart/Cart'


type CheckOutFormProps = {
    handleCloseCheckout: () => void
    sendOrder: (data: OrderData) => void
    error: string
}

type FormInputsValidity = {
    name: boolean
    street: boolean
    city: boolean
    postalCode: boolean
}

const CheckOutForm = forwardRef<HTMLFormElement, CheckOutFormProps>(({ handleCloseCheckout, sendOrder, error }, ref) => {

    const { items, total } = CartData();

    const [formInputsValidity, setFormInputsValidity] = useState<FormInputsValidity>({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });
    const [loading, setLoading] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const streetRef = useRef<HTMLInputElement>(null)
    const postalCodeRef = useRef<HTMLInputElement>(null)
    const cityRef = useRef<HTMLInputElement>(null)


    const checkValidity = (input: HTMLInputElement | null): boolean => {
        if (input === null)
            return false
        if (input.value.trim().length === 0)
            return false
        return true
    }

    const handleSubmitOrder = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setFormInputsValidity({
            name: true,
            street: true,
            city: true,
            postalCode: true,
        })
        const nameCheck = checkValidity(nameRef.current)
        const streetCheck = checkValidity(streetRef.current)
        const postalCodeCheck = checkValidity(postalCodeRef.current) && postalCodeRef.current!.value.trim().length === 6
        const cityCheck = checkValidity(cityRef.current)


        setFormInputsValidity({
            name: nameCheck,
            street: streetCheck,
            postalCode: postalCodeCheck,
            city: cityCheck,
        })

        if (nameCheck && streetCheck && postalCodeCheck && cityCheck) {
            const data = {
                items: items,
                fullName: nameRef.current!.value,
                street: streetRef.current!.value,
                postalCode: postalCodeRef.current!.value,
                city: cityRef.current!.value,
                total: total
            }
            sendOrder(data)
        }
        else
            setLoading(false)
    }

    

    return (
        <form ref={ref} onSubmit={handleSubmitOrder}>
            <div className={`${styles.control} ${!formInputsValidity.name ? styles.invalid : ''}`}>
                <label htmlFor='name'>Full Name</label>
                <input type='text' ref={nameRef} id='name' />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${styles.control} ${!formInputsValidity.street ? styles.invalid : ''}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' ref={streetRef} id='street' />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${styles.control} ${!formInputsValidity.postalCode ? styles.invalid : ''}`}>
                <label htmlFor='postalCode'>Postal Code</label>
                <input type='text' ref={postalCodeRef} id='postalCode' />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code (6 characters long)!</p>}
            </div>
            <div className={`${styles.control} ${!formInputsValidity.city ? styles.invalid : ''}`}>
                <label htmlFor='city'>City</label>
                <input type='text' ref={cityRef} id='city' />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={handleCloseCheckout}>Cancel</button>
                <button type='submit' disabled={loading} className={styles.submit}>Confirm</button>
            </div>
        </form>
    )
})
export default CheckOutForm
