import { zUpdateProfileTrpcInput } from "@ideaapp/server/src/router/auth/updateProfile/input";
import { withPageWrapper } from "../../lib/pageWrapper";
import { trpc } from "../../lib/trpc";
import { useForm } from "../../lib/form";
import { Segment } from "../../components/Segment";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Alert } from "../../components/Alert";
import { SubmitButton } from "../../components/SubmitButton";
import type { TrpcRouterOutput } from '../../../../server/src/router/index';
import { zUpdatePasswordTrpcInput } from "@ideaapp/server/src/router/auth/updatePassword/input";
import { z } from "zod";

const General = ({my}: NonNullable<TrpcRouterOutput["getMy"]["my"]>) => {
    const trpcUtils = trpc.useUtils()
    const updateProfile = trpc.updateProfile.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            nick: my.nick,
            name: my.name
        },
        validationSchema: zUpdateProfileTrpcInput,
        onSubmit: async values => {
            const updateUser = await updateProfile.mutateAsync({
                nick: values.nick,
                name: values.name
            })
            trpcUtils.getMy.setData(undefined, {my: updateUser})
        },
        successMessage: 'Profile updated',
        resetOnSuccess: false
    })
    return (
            <form onSubmit={formik.handleSubmit} >
                <FormItems>
                    <Input name='nick' label='Nick' formik={formik} />
                    <Input name='name' label='Name' formik={formik} />
                    <Alert {...alertProps} />
                    <SubmitButton {...buttonProps}>Save</SubmitButton>
                </FormItems>
            </form>
    )
}

const Password = () => {
    const updatePassword = trpc.updatePassword.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: zUpdatePasswordTrpcInput.extend({
            confirmPassword: z.string().min(1)
        }).superRefine((values, ctx) => {
            if (values.newPassword !== values.confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['confirmPassword'],
                    message: 'Passwords do not match'
                })
            }
        }),
        onSubmit: async ({newPassword, oldPassword}) => {
            await updatePassword.mutateAsync({
                newPassword,
                oldPassword
            })
        },
        successMessage: 'Password updated',
        resetOnSuccess: false
    })
    return (
        <form onSubmit={formik.handleSubmit} >
            <FormItems>
                <Input name='oldPassword' label='Old Password' formik={formik} type='password' />
                <Input name='newPassword' label='New Password' formik={formik} type='password' />
                <Input name='confirmPassword' label='Confirm Password' formik={formik} type='password' />
                <Alert {...alertProps} />
                <SubmitButton {...buttonProps}>Save</SubmitButton>
            </FormItems>
        </form>
    )
}

export const EditProfilePage = withPageWrapper({
    authorizedOnly: true,
    setProps:({getAuthorizedMy}) => ({
        my: getAuthorizedMy()
    })
})(({my}) => {
    return (
    <>
        <Segment title="Edit Profile">
            <Segment title="General" size={2}>
                <General my={my} />
            </Segment>
            <Segment title="Password" size={2}>
                <Password />
            </Segment>
        </Segment>
    </>
    )
})