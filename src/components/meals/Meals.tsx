import { useState, useEffect } from 'react';
import styles from './meals.module.css'
import Card from '../ui/Card/Card';
import MealItem from './Meal Item/MealItem';

type meal = {
    name: string
    description: string
    price: number
    id: string
}
export default function Meals() {

    const [meals, setMeals] = useState<meal[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/MEALS.json')
            .then(res => res.json())
            .then(data => {
                const mealsArray = []
                for (const meal in data) {
                    mealsArray.push({ ...data[meal], id: meal })
                }
                setMeals(mealsArray)
            })
            .catch(error => setError('Error in fetching the meals'))
            .finally(() => setLoading(false))

    }, [])

    return (
        <>

            <section className={styles.summary}>
                <h2>Roll with us</h2>
                <p>
                    Choose your favorite Authentic Japanese Cuisine from our broad selection of available meals
                </p>
                <p>
                    All our meals are cooked with high-quality ingredients, just-in-time and
                    by experienced chefs!
                </p>
            </section>
            {loading ?
                <section className={styles['meals-loading']}>
                    <p>Loading...</p>
                </section>
                :
                (error ?
                    <section className={styles['meals-loading']}>
                        <p>{error}</p>
                    </section>
                    :
                    <section className={styles.meals}>
                        <Card>
                            <ul>
                                {!loading && meals.map((obj) => {
                                    return (
                                        <MealItem
                                            key={obj.id}
                                            id={obj.id}
                                            name={obj.name}
                                            description={obj.description}
                                            price={obj.price}
                                        />
                                    )
                                })}
                            </ul>
                        </Card>

                    </section>
                )
            }
        </>
    )
}
