import { trpc } from "../../lib/trpc"
import { zSignInTrpcInput } from "@ideaapp/server/src/router/auth/signIn/input"
import Cookies from "js-cookie"
import { Segment } from "../../components/Segment"
import { FormItems } from "../../components/FormItems"
import { Input } from "../../components/Input"
import { SubmitButton } from "../../components/SubmitButton"
import { Alert } from "../../components/Alert"
import { useForm } from "../../lib/form"
import { withPageWrapper } from "../../lib/pageWrapper"

export const SignInPage = withPageWrapper({
    redirectAuthorized: true,
    title: 'Sign In'
})(() => {
    const trpcUtils = trpc.useUtils()
    const signIn = trpc.signIn.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            nick: '',
            password: ''
        },
        validationSchema: zSignInTrpcInput,
        onSubmit: async (values) => {
            const { token } = await signIn.mutateAsync(values)
                Cookies.set('token', token, { expires: 9999 })
                trpcUtils.invalidate()
        },
        resetOnSuccess: false
    })
    return (
        <Segment title="Sign In">
            <form onSubmit={() => formik.handleSubmit()}>
                <FormItems>
                    <Input name='nick' label='Nick' formik={formik} />
                    <Input name='password' label='Password' formik={formik} />
                    <Alert {...alertProps} />
                    <SubmitButton {...buttonProps} >Sign In</SubmitButton>
                </FormItems>
            </form>
        </Segment>
    )
})