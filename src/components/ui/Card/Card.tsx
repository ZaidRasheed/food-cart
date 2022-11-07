import styles from './card.module.css'

type Props = {
    children: JSX.Element,
};

export default function Card({ children }: Props) {
    return (
        <div className={styles.card}>{children}</div>
    )
}

