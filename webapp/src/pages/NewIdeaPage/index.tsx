import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/Textarea'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z} from 'zod'

export const NewIdeaPage = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
             nickname: '',
              description: '',
               text: ''
        },
        validate: withZodSchema(z.object({
                name: z.string().min(1),
                nickname: z
                    .string()
                    .min(1)
                    .regex(/^[a-z0-9]+$/, 'Must be lowercase, numbers and dashes only'),
                description: z.string().min(1),
                text: z.string().min(30, 'Too short, min 30 characters') 
            })),
        onSubmit: (values) => {
            console.info('Submit', values)
        }
    })
    return (
        <Segment title="New Idea">
            <form onSubmit={() => formik.handleSubmit()}>
                <Input name='name' lable='Name' formik={formik} />
                <Input name='nickname' lable='Nickname' formik={formik} />
                <Input name='description' lable='Description' formik={formik} />
                <TextArea name='text' lable='Text' formik={formik} />
                {!formik.isValid && !!formik.submitCount && <p style={{ color: 'red' }}>Form is invalid</p>}
                <button type='submit'>Submit</button>
            </form>
        </Segment>
    )
}