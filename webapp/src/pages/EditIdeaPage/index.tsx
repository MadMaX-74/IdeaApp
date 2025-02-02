import { useNavigate, useParams } from "react-router-dom"
import { getViewIdeaRoute, UpdateIdeaRouteParams } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import { TrpcRouterOutput } from "@ideaapp/server/src/router"
import { useState } from "react"
import { useFormik } from "formik"
import { withZodSchema } from "formik-validator-zod"
import { zUpdateIdeaTrpcInput } from "@ideaapp/server/src/router/updateIdea/input"
import { Segment } from "../../components/Segment"
import { FormItems } from "../../components/FormItems"
import { Input } from "../../components/Input"
import { TextArea } from "../../components/Textarea"
import { Alert } from "../../components/Alert"
import { SubmitButton } from "../../components/SubmitButton"



const EditIdeaComponent: React.FC<{ idea: NonNullable<TrpcRouterOutput ['getIdea'] [' idea' ]>} > = ({ idea }) => {
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false)
    const updateIdea = trpc.updateIdea.useMutation()
    const formik = useFormik({
        initialValues: {
            title: idea.title,
            description: idea.description,
            text: idea.text
        },
        validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })),
        onSubmit: async (values) => {
            try {
                setShowError(false)
                await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
                navigate(getViewIdeaRoute({ id: idea.id }), { replace: true })
            } catch (error: any) {
                setShowError(true)
            }
        }
    })
    return (
        <Segment title={`Edit idea: ${idea.title}`}>
            <form onSubmit={() => formik.handleSubmit()}>
                <FormItems>
                    <Input label="Title" name="title" formik={formik} />
                    <Input label="Description" name="description" formik={formik} />
                    <TextArea label="Text" name="text" formik={formik} maxWidth={500} />
                    {showError && <Alert color='red'>Error updating idea</Alert>}
                    <SubmitButton loading={formik.isSubmitting}>Update Idea</SubmitButton>
                </FormItems>
            </form>
        </Segment>
    )
}

export const EditIdeaPage = () => {
    const params = useParams() as UpdateIdeaRouteParams

    const getIdeasResult = trpc.getIdea.useQuery({ id: params.ideaId })
    const getMy = trpc.getMy.useQuery()

    if (getMy.isFetching || getIdeasResult.isFetching || getMy.isLoading || getIdeasResult.isLoading) {
        return <div>Loading...</div>
    }
    if (getIdeasResult.isError) {
        return <div>Error: {getIdeasResult.error.message}</div>
    }
    if (getMy.isError) {
        return <div>Error: {getMy.error.message}</div>
    }
    if (!getIdeasResult.data?.idea) {
        return <div>Idea not found</div>
    }
    const idea = getIdeasResult.data.idea
    const my = getMy.data.my
    if (!my) {
        return <div>Only for authorized users</div>
    }
    if (my.id !== idea.authorId) {
        return <div>Only author can edit the idea</div>
    }

    return <EditIdeaComponent idea={idea} />

}