import { useState } from "react"
import { trpc } from "../../lib/trpc"
import { useFormik } from "formik"
import { withZodSchema } from "formik-validator-zod"
import { zSignInTrpcInput } from "@ideaapp/server/src/router/signIn/input"
import Cookies from "js-cookie"
import { Alert } from "../../components/Alert"
import { Segment } from "../../components/Segment"
import { FormItems } from "../../components/FormItems"
import { Input } from "../../components/Input"
import { SubmitButton } from "../../components/SubmitButton"
import { useNavigate } from "react-router-dom"
import { getAllIdeasRoute } from "../../lib/routes"

export const SignInPage = () => {
    const navigate = useNavigate()
    const trpcUtils = trpc.useUtils()
    const [errorMessageVisible, setErrorMessageVisible] = useState<string | null>(null)
    const signIn = trpc.signIn.useMutation()
    const formik = useFormik({
        initialValues: {
            nick: '',
            password: ''
        },
        validate: withZodSchema(zSignInTrpcInput),
        onSubmit: async (values) => {
            try {
                setErrorMessageVisible(null)
                const { token } = await signIn.mutateAsync(values)
                Cookies.set('token', token, { expires: 9999 })
                trpcUtils.invalidate()
                navigate(getAllIdeasRoute())
            } catch (error: any) {
                setErrorMessageVisible(error.message)
            }
        }
    })
    return (
        <Segment title="Sign In">
            <form onSubmit={() => formik.handleSubmit()}>
                <FormItems>
                    <Input name='nick' label='Nick' formik={formik} />
                    <Input name='password' label='Password' formik={formik} />
                    {!formik.isValid && !!formik.submitCount && <p style={{ color: 'red' }}>Form is invalid</p>}
                </FormItems>
                <SubmitButton loading={formik.isSubmitting} >Sign In</SubmitButton>
            </form>
            {errorMessageVisible && <Alert color="red" children={errorMessageVisible} />}
        </Segment>
    )
}