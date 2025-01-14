import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/Textarea'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@ideaapp/server/src/router/createIdea/input'
import { useState } from 'react'

export const NewIdeaPage = () => {
    const [successMessageVisible, setSuccessMessageVisible] = useState(false)
    const [errorMessageVisible, setErrorMessageVisible] = useState<string | null>(null)
    const createIdea = trpc.createIdea.useMutation()
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            text: ''
        },
        validate: withZodSchema(zCreateIdeaTrpcInput),
        onSubmit: async (values) => {
           try {
            await createIdea.mutateAsync(values)
            setSuccessMessageVisible(true)
            setTimeout(() => { setSuccessMessageVisible(false) }, 3000)
           } catch (error: any) {
             setErrorMessageVisible(error.message) 
            }
        }
    })
    return (
        <Segment title="New Idea">
            <form onSubmit={() => formik.handleSubmit()}>
                <Input name='title' lable='Title' formik={formik} />
                <Input name='description' lable='Description' formik={formik} />
                <TextArea name='text' lable='Text' formik={formik} />
                {!formik.isValid && !!formik.submitCount && <p style={{ color: 'red' }}>Form is invalid</p>}
                {successMessageVisible && <div style={{ color: 'green' }}>Idea created successfully</div>}
                {!!errorMessageVisible && <div style={{ color: 'red' }}>{errorMessageVisible}</div>}
                <button disabled={!formik.isSubmitting} type='submit'>
                    {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
                </button>
            </form>
        </Segment>
    )
}