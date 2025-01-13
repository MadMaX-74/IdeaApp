import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/Textarea'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@ideaapp/server/src/router/createIdea/input'

export const NewIdeaPage = () => {
    const createIdea = trpc.createIdea.useMutation()
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            text: ''
        },
        validate: withZodSchema(zCreateIdeaTrpcInput),
        onSubmit: async (values) => {
            await createIdea.mutateAsync(values)
        }
    })
    return (
        <Segment title="New Idea">
            <form onSubmit={() => formik.handleSubmit()}>
                <Input name='title' lable='Title' formik={formik} />
                <Input name='description' lable='Description' formik={formik} />
                <TextArea name='text' lable='Text' formik={formik} />
                {!formik.isValid && !!formik.submitCount && <p style={{ color: 'red' }}>Form is invalid</p>}
                <button type='submit'>Submit</button>
            </form>
        </Segment>
    )
}