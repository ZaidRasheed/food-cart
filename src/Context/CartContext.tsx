import { useState, createContext, useContext, useEffect } from 'react'

type Props = {
    children: JSX.Element | JSX.Element[]
}
type Item = {
    id: string,
    name: string,
    description: string,
    price: number,
}
export type Items = {
    id: string,
    name: string,
    description: string,
    price: number,
    amount: number
}

interface AppContextInterface {
    items: Items[],
    total: number,
    addItem: (item: Item, amount: number) => void,
    removeItem: (item: Item, amount: number) => void,
    emptyCart: () => void
}

const CartContext = createContext({} as AppContextInterface)

export const CartData = () => {
    return useContext(CartContext)
}

export const CartProvider = (props: Props) => {

    const [items, setItems] = useState<Items[]>([])
    const [total, setTotal] = useState<number>(0)

    const addItem = (item: Item, amount: number) => {
        const index = items.findIndex(obj => {
            return obj.id === item.id
        })
        if (items[index]) {
            const newItems: Items[] = items
            newItems[index] = {
                ...newItems[index],
                amount: items[index].amount + amount
            }
            setItems(newItems)
        }
        else
            setItems(prev => {
                return [...prev, { ...item, amount: amount }]
            })

        setTotal((prev) => {
            return prev + (item.price * amount);
        })
    }

    const removeItem = (item: Item, amount: number) => {
        const index = items.findIndex(obj => {
            return obj.id === item.id
        })
        if (items[index]) {
            if (items[index].amount <= amount || amount === -1) {
                const newItems: Items[] = items
                const actualAmount = items[index].amount
                newItems.splice(index, 1)
                setItems(newItems)
                setTotal((prev) => {
                    return prev - (item.price * actualAmount);
                })
            }
            else {
                const newItems: Items[] = items
                newItems[index] = {
                    ...newItems[index],
                    amount: items[index].amount - amount
                }
                setItems(newItems)
                setTotal((prev) => {
                    return prev - (item.price * amount);
                })
            }

        }
    }
    const emptyCart = () => {
        setItems([])
        setTotal(0)
    }

    const values = {
        items,
        total,
        addItem,
        removeItem,
        emptyCart
    }
    return (
        <CartContext.Provider value={values}>
            {props.children}
        </CartContext.Provider>
    )
}
