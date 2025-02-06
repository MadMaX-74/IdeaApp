import { zUpdateProfileTrpcInput } from "@ideaapp/server/src/router/auth/updateProfile/input";
import { withPageWrapper } from "../../lib/pageWrapper";
import { trpc } from "../../lib/trpc";
import { useForm } from "../../lib/form";
import { Segment } from "../../components/Segment";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Alert } from "../../components/Alert";
import { SubmitButton } from "../../components/SubmitButton";

export const EditProfilePage = withPageWrapper({
    authorizedOnly: true,
    setProps:({ctx}) => ({
        my: ctx.my!
    })
})(({my}) => {
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
        <Segment title="Edit Profile">
            <form onSubmit={formik.handleSubmit} >
                <FormItems>
                    <Input name='nick' label='Nick' formik={formik} />
                    <Input name='name' label='Name' formik={formik} />
                    <Alert {...alertProps} />
                    <SubmitButton {...buttonProps}>Save</SubmitButton>
                </FormItems>
            </form>
        </Segment>
    )
})