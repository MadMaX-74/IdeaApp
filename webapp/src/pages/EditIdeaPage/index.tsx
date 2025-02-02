import { useNavigate, useParams } from "react-router-dom"
import { getViewIdeaRoute, UpdateIdeaRouteParams } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import { TrpcRouterOutput } from "@ideaapp/server/src/router"
import { zUpdateIdeaTrpcInput } from "@ideaapp/server/src/router/updateIdea/input"
import { Segment } from "../../components/Segment"
import { FormItems } from "../../components/FormItems"
import { Input } from "../../components/Input"
import { TextArea } from "../../components/Textarea"
import { Alert } from "../../components/Alert"
import { SubmitButton } from "../../components/SubmitButton"
import { useForm } from "../../lib/form"
import { useMy } from "../../lib/ctx"



const EditIdeaComponent: React.FC<{ idea: NonNullable<TrpcRouterOutput ['getIdea'] [' idea' ]>} > = ({ idea }) => {
    const navigate = useNavigate()
    const updateIdea = trpc.updateIdea.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            title: idea.title,
            description: idea.description,
            text: idea.text
        },
        validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
        onSubmit: async (values) => {
            await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
                navigate(getViewIdeaRoute({ id: idea.id }), { replace: true })
        },
        resetOnSuccess: false,
        showValidationAlert: true

    })
    return (
        <Segment title={`Edit idea: ${idea.title}`}>
            <form onSubmit={() => formik.handleSubmit()}>
                <FormItems>
                    <Input label="Title" name="title" formik={formik} />
                    <Input label="Description" name="description" formik={formik} />
                    <TextArea label="Text" name="text" formik={formik} maxWidth={500} />
                    <Alert {...alertProps} />
                    <SubmitButton {...buttonProps} >Update Idea</SubmitButton>
                </FormItems>
            </form>
        </Segment>
    )
}

export const EditIdeaPage = () => {
    const params = useParams() as UpdateIdeaRouteParams

    const getIdeasResult = trpc.getIdea.useQuery({ id: params.ideaId })
    const my = useMy()

    if (getIdeasResult.isFetching || getIdeasResult.isLoading) {
        return <div>Loading...</div>
    }
    if (getIdeasResult.isError) {
        return <div>Error: {getIdeasResult.error.message}</div>
    }
    if (!getIdeasResult.data?.idea) {
        return <div>Idea not found</div>
    }
    const idea = getIdeasResult.data.idea
    if (!my) {
        return <div>Only for authorized users</div>
    }
    if (my.id !== idea.authorId) {
        return <div>Only author can edit the idea</div>
    }

    return <EditIdeaComponent idea={idea} />

}