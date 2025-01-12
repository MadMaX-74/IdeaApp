import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/Textarea'
import { useFormik } from 'formik'

export const NewIdeaPage = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
             nickname: '',
              description: '',
               text: ''
        },
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
                <button type='submit'>Submit</button>
            </form>
        </Segment>
    )
}