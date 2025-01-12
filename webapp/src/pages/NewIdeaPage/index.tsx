import { useState } from 'react'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/Textarea'

export const NewIdeaPage = () => {
    const [state, setState] = useState({
        name: '',
        nickname: '',
        description: '',
        text: '',
    })
    return (
        <Segment title="New Idea">
            <form onSubmit={(e) => {
                e.preventDefault()
                console.info('Submit', state)
            }}>
                <Input name='name' lable='Name' state={state} setState={setState} />
                <Input name='nickname' lable='Nickname' state={state} setState={setState} />
                <Input name='description' lable='Description' state={state} setState={setState} />
                <TextArea name='text' lable='Text' state={state} setState={setState} />
                <button type='submit'>Submit</button>
            </form>
        </Segment>
    )
}