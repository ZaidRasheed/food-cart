import styles from './meals.module.css'
import Card from '../ui/Card/Card';
import MealItem from './Meal Item/MealItem';
const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Veggie Sushi Bowl',
        description: 'Finest fish and veggies',
        price: 13.99,
    },
    {
        id: 'm2',
        name: 'Crunchy Dragon',
        description: 'Shrimp tempura roll with kani-kama crab topped with spicy tuna and crispy tempura flakes',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Kamikaze Roll',
        description: 'Spicy tuna and cucumber inside, topped with avocado (Half sriracha & half sweet)',
        price: 17.99,
    },
    {
        id: 'm4',
        name: 'Firecracker Shrimp',
        description: 'Crispy tempura battered shrimp tossed with our original spicy sauce',
        price: 11.99,
    },
];

export default function Meals() {
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
            <section className={styles.meals}>
                <Card>
                    <ul>
                        {DUMMY_MEALS.map((obj) => {
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
        </>
    )
}
