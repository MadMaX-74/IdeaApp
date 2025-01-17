import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/Textarea'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@ideaapp/server/src/router/createIdea/input'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { SubmitButton } from '../../components/SubmitButton'
import { FormItems } from '../../components/FormItems'

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
             setTimeout(() => { setErrorMessageVisible(null) }, 3000) 
            }
        }
    })
    return (
        <Segment title="New Idea">
            <form onSubmit={() => formik.handleSubmit()}>
                <FormItems>
                    <Input name='title' lable='Title' formik={formik} />
                    <Input name='description' lable='Description' formik={formik} />
                    <TextArea name='text' lable='Text' formik={formik} maxWidth={500} />
                    {!formik.isValid && !!formik.submitCount && <p style={{ color: 'red' }}>Form is invalid</p>}
                    {successMessageVisible && <Alert color='green'>Idea created successfully</Alert>}
                    {!!errorMessageVisible && <Alert color='red'>{errorMessageVisible}</Alert>}
                    <SubmitButton loading={formik.isSubmitting}>Create Idea</SubmitButton>
                </FormItems>
            </form>
        </Segment>
    )
}