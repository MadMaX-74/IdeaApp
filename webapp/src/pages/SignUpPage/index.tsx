import { trpc } from "../../lib/trpc"
import { zSignUpTrpcInput } from "@ideaapp/server/src/router/signUp/input"
import { z } from "zod"
import Cookies from "js-cookie"
import { Alert } from "../../components/Alert"
import { Segment } from "../../components/Segment"
import { FormItems } from "../../components/FormItems"
import { Input } from "../../components/Input"
import { SubmitButton } from "../../components/SubmitButton"
import { useForm } from "../../lib/form"
import { withPageWrapper } from "../../lib/pageWrapper"

export const SignUpPage = withPageWrapper({
    redirectAuthorized: true
})(() => {
    const trpcUtils = trpc.useUtils()
    const signUp = trpc.signUp.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            nick: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: zSignUpTrpcInput.extend({
            confirmPassword: z.string().min(1)
        }).superRefine((values, ctx) => {
            if (values.password !== values.confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['confirmPassword'],
                    message: 'Passwords do not match'
                })
            }
        }),
        onSubmit: async (values) => {
            const { token } = await signUp.mutateAsync(values)
                Cookies.set('token', token, { expires: 9999 })
                trpcUtils.invalidate()
        },
        resetOnSuccess: false
    })
    return (
        <Segment title="Sign Up">
            <form onSubmit={formik.handleSubmit} >
                <FormItems>
                    <Input name='nick' label='Nick' formik={formik} />
                    <Input name='password' label='Password' type='password' formik={formik} />
                    <Input name='confirmPassword' label='Confirm Password' type='password' formik={formik} />
                    <Alert {...alertProps} />
                    <SubmitButton {...buttonProps}>Sign Up</SubmitButton>
                </FormItems>
            </form>
        </Segment>
    )
})