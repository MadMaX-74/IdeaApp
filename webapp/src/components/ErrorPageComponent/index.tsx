import { Alert } from "../Alert"
import { Segment } from "../Segment"

export const ErrorPageComponent = (
    {title = 'Something went wrong', message = 'Please try again later', children}:
        {title?: string, message?: string, children?: React.ReactNode}
) => {
    return (
        <Segment title={title}>
            <Alert color="red">{message}</Alert>
            {children}
        </Segment>
    )
}