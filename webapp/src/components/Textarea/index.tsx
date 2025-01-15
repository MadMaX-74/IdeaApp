import { type FormikProps } from "formik"
import styles from './style.module.scss'
import cn from 'classnames'


type TextAreaProps = {
    name: string,
    lable: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: FormikProps<any>,
    maxWidth?: number
}

export const TextArea = ({
    name,
    lable,
    formik,
    maxWidth,
} : TextAreaProps) => {
    const value = formik.values[name]
    const error = formik.errors[name] as string | undefined
    const touched = formik.touched[name]
    const disabled = formik.isSubmitting
    const invalid = !!touched && !!error
    return (
        <div className={cn(styles.field, { [styles.disabled]: disabled })}>
                    <label className={styles.label} htmlFor={name}>{lable}</label>
                    <textarea
                     id={name}
                     value={value}
                     onChange={(e) => formik.setFieldValue(name, e.target.value)}
                     onBlur={() => formik.setFieldTouched(name, true)}
                     disabled={disabled}
                     className={cn(styles.input, { [styles.invalid]: invalid, [styles.focus]: touched })}
                     style={{ maxWidth: `${maxWidth}px` }}
                     />
                     {!!touched && !!error && <span className={styles.error}>{error}</span>}
                </div>
    )
}