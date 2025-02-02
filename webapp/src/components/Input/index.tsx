import { type FormikProps } from "formik"
import styles from './style.module.scss'
import cn from 'classnames'

type InputProps = {
    name: string,
    label: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: FormikProps<any>,
    maxWidth?: number,
    type?: 'text' | 'password'
}

export const Input = ({
    name,
    label,
    type = 'text',
    formik,
    maxWidth
} : InputProps) => {
    const value = formik.values[name]
    const error = formik.errors[name] as string | undefined
    const touched = formik.touched[name]
    const disabled = formik.isSubmitting
    const invalid = !!touched && !!error
    return (
        <div className={cn(styles.field, { [styles.disabled]: disabled })}>
            <label htmlFor={name} className={styles.label}>{label}</label>
            <input type={type}
             className={cn(styles.input, { [styles.invalid]: invalid })}
             style={{ maxWidth }}
             id={name}
             value={value}
             onChange={(e) => formik.setFieldValue(name, e.target.value)}
             onBlur={() => formik.setFieldTouched(name, true)}
             disabled={disabled}
             />
             {invalid && <span className={styles.error}>{error}</span>}
        </div>
    )
}