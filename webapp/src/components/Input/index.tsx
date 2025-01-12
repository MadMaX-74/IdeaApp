type InputProps = {
    name: string,
    lable: string,
    state: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState: React.Dispatch<React.SetStateAction<any>>
}

export const Input = ({
    name,
    lable,
    state,
    setState
} : InputProps) => {
    return (
        <div style={{ marginBottom: '10px' }}>
                    <label htmlFor={name}>{lable}</label>
                    <br />
                    <input type='text'
                     id={name}
                     value={state[name]}
                     onChange={(e) => setState({ ...state, [name]: e.target.value })}
                     />
                </div>
    )
}