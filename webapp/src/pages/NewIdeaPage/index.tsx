import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@ideaapp/server/src/router/createIdea/input'
import { Alert } from '../../components/Alert'
import { SubmitButton } from '../../components/SubmitButton'
import { FormItems } from '../../components/FormItems'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'

export const NewIdeaPage = withPageWrapper({
    authorizedOnly: true
}) (() => {
    const createIdea = trpc.createIdea.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            title: '',
            description: '',
            text: ''
        },
        validationSchema: zCreateIdeaTrpcInput,
        onSubmit: async (values) => {
            await createIdea.mutateAsync(values)
            formik.resetForm()
        },
        successMessage: 'Idea created',
        showValidationAlert: true
    })
    return (
        <Segment title="New Idea">
            <form onSubmit={() => formik.handleSubmit()}>
                <FormItems>
                    <Input name='title' label='Title' formik={formik} />
                    <Input name='description' label='Description' formik={formik} />
                    <TextArea name='text' label='Text' formik={formik} maxWidth={500} />
                    <Alert {...alertProps} />
                    <SubmitButton {...buttonProps}>Create Idea</SubmitButton>
                </FormItems>
            </form>
        </Segment>
    )
})