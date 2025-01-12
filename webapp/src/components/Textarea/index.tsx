import { type FormikProps } from "formik"

type TextAreaProps = {
    name: string,
    lable: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: FormikProps<any>
}

export const TextArea = ({
    name,
    lable,
    formik
} : TextAreaProps) => {
    const value = formik.values[name]
    const error = formik.errors[name] as string | undefined
    const touched = formik.touched[name]
    return (
        <div style={{ marginBottom: '10px' }}>
                    <label htmlFor={name}>{lable}</label>
                    <br />
                    <textarea
                     id={name}
                     value={value}
                     onChange={(e) => formik.setFieldValue(name, e.target.value)}
                     onBlur={() => formik.setFieldTouched(name, true)}
                     />
                     {!!touched && !!error && <span style={{ color: 'red' }}>{error}</span>}
                </div>
    )
}