import styles from './input.module.css'
import * as React from 'react'
type Props = {
    label: string
    input: {
        id: string,
        type: string,
        min: string,
        max: string,
        step: string,
        defaultValue: string,
    }
}

const Input = React.forwardRef((props: Props, ref: React.Ref<HTMLInputElement>) => {
    return (
        <div className={styles.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    )
})

export default Input
