import { Alert } from "../Alert"
import { Segment } from "../Segment"

export const ErrorPageComponent = (
    {title = 'Something went wrong', message = 'Please try again later'}:
        {title?: string, message?: string}
) => {
    return (
        <Segment title={title}>
            <Alert color="red">{message}</Alert>
        </Segment>
    )
}