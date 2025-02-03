import { ErrorPageComponent } from "../../components/ErrorPageComponent"

export const NotFoundPage = ({
    title = '404 Not Found',
    message = 'Sorry, the page you visited does not exist.'
}: {
    title?: string
    message?: string
}) => <ErrorPageComponent title={title} message={message} />