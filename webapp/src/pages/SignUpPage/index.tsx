import { useState } from "react"
import { trpc } from "../../lib/trpc"
import { useFormik } from "formik"
import { withZodSchema } from "formik-validator-zod"
import { zSignUpTrpcInput } from "@ideaapp/server/src/router/signUp/input"
import { z } from "zod"
import Cookies from "js-cookie"
import { Alert } from "../../components/Alert"
import { Segment } from "../../components/Segment"
import { FormItems } from "../../components/FormItems"
import { Input } from "../../components/Input"
import { SubmitButton } from "../../components/SubmitButton"
import { useNavigate } from "react-router-dom"
import { getAllIdeasRoute } from "../../lib/routes"

export const SignUpPage = () => {
    const navigate = useNavigate()
    const trpcUtils = trpc.useUtils()
    const [errorMessageVisible, setErrorMessageVisible] = useState<string | null>(null)
    const signUp = trpc.signUp.useMutation()
    const formik = useFormik({
        initialValues: {
            nick: '',
            password: '',
            confirmPassword: ''
        },
        validate: withZodSchema(zSignUpTrpcInput.extend({
            confirmPassword: z.string().min(1)
        })
        .superRefine((values, ctx) => {
            if (values.password !== values.confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['confirmPassword'],
                    message: 'Passwords do not match'
                })
            }
        })),
        onSubmit: async (values) => {
            try {
                setErrorMessageVisible(null)
                const { token } = await signUp.mutateAsync(values)
                Cookies.set('token', token, { expires: 9999 })
                trpcUtils.invalidate()
                navigate(getAllIdeasRoute())
            } catch (error: any) {
                setErrorMessageVisible(error.message)
            }
        }
    })
    return (
        <Segment title="Sign Up">
            <form onSubmit={formik.handleSubmit} >
                <FormItems>
                    <Input name='nick' label='Nick' formik={formik} />
                    <Input name='password' label='Password' type='password' formik={formik} />
                    <Input name='confirmPassword' label='Confirm Password' type='password' formik={formik} />
                    {!formik.isValid && !!formik.submitCount && <p style={{ color: 'red' }}>Form is invalid</p>}
                    {!!errorMessageVisible && <Alert color='red'>{errorMessageVisible}</Alert>}
                    <SubmitButton loading={formik.isSubmitting}>Sign Up</SubmitButton>
                </FormItems>
            </form>
        </Segment>
    )
}