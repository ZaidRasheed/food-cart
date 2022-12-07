import ReactDOM from 'react-dom';
import styles from './modal.module.css'

type Props = {
    children: JSX.Element | JSX.Element[]
    closeCart: Function
}

const ModalOverlay = ({ children, closeCart }: Props) => {
    return (
        <>
            <div className={styles.backdrop} onClick={() => { closeCart() }}>
            </div>
            <div className={styles.modal}>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    );
};


const portalElement = document.getElementById('overlays')!;
export default function Modal({ children, closeCart }: Props) {
    return (
        <>
            {ReactDOM.createPortal(
                <ModalOverlay
                    closeCart={closeCart}
                >
                    {children}
                </ModalOverlay>,
                portalElement
            )}
        </>
    )
}
