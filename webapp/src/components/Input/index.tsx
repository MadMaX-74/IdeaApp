import { type FormikProps } from "formik"

type InputProps = {
    name: string,
    lable: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: FormikProps<any>
}

export const Input = ({
    name,
    lable,
    formik
} : InputProps) => {
    const value = formik.values[name]
    return (
        <div style={{ marginBottom: '10px' }}>
                    <label htmlFor={name}>{lable}</label>
                    <br />
                    <input type='text'
                     id={name}
                     value={value}
                     onChange={(e) => formik.setFieldValue(name, e.target.value)}
                     />
                </div>
    )
}