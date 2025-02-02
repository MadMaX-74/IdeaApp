import { useFormik } from "formik"
import { withZodSchema } from "formik-validator-zod"
import { type FormikHelpers } from "formik/dist/types"
import { useMemo, useState } from "react"
import { z } from "zod"
import { type AlertProps } from "../components/Alert"
import { type ButtonProps } from "../components/SubmitButton"

type UseFormType<TZodSchema extends z.ZodTypeAny> = {
    successMessage?: string | false
    resetOnSuccess?: boolean
    showValidationAlert?: boolean
    initialValues?: z.infer <TZodSchema>
    validationSchema?: TZodSchema
    onSubmit: (values: z.infer <TZodSchema>, actions: FormikHelpers<z.infer <TZodSchema>>) => Promise<any> | any
}

export const useForm = <TZodSchema extends z.ZodTypeAny>({
        successMessage = false,
        resetOnSuccess = true,
        showValidationAlert = false,
        initialValues = {},
        validationSchema,
        onSubmit
    }: UseFormType<TZodSchema>
) => {
    const [successMessageVisible, setSuccessMessageVisible] = useState(false)
    const [submittingError, setSubmittingError] = useState<Error | null>(null)

    const formik = useFormik<z.infer <TZodSchema>>({
        initialValues,
        ...(validationSchema && {validate: withZodSchema(validationSchema)}),
        onSubmit: async (values, formikHelpers) => {
            try {
                setSubmittingError(null)
                await onSubmit(values, formikHelpers)
                if (resetOnSuccess) {
                    formik.resetForm()
                }
                setSuccessMessageVisible(true)
                setTimeout(() => {
                    setSuccessMessageVisible(false)
                }, 3000)

            } catch (error: any) {
                setSubmittingError(error)
            }
        }
    })
    const alertProps = useMemo<AlertProps>(() => {
        if (submittingError) {
            return {
                hidden: false,
                color: 'red',
                children: submittingError.message
            }
        }
        if (showValidationAlert && !formik.isValid  && !!formik.submitCount) {
            return {
                hidden: false,
                color: 'red',
                children: 'Some field is invalid'
            }
        }
        if (successMessageVisible && successMessage) {
            return {
                hidden: false,
                color: 'green',
                children: successMessage
            }
        }
        return {
            hidden: false,
            color: 'red',
            children: ""
        }
    }, [submittingError, successMessage, successMessageVisible, formik.isValid, formik.submitCount, showValidationAlert])

    const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
        return {
            loading: formik.isSubmitting
        }
    }, [formik.isSubmitting])

    return {
        formik,
        alertProps,
        buttonProps
    }
}