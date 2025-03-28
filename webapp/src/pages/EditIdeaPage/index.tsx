import { useNavigate, useParams } from "react-router-dom"
import { getViewIdeaRoute, UpdateIdeaRouteParams } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import { zUpdateIdeaTrpcInput } from "@ideaapp/server/src/router/ideas/updateIdea/input"
import { Segment } from "../../components/Segment"
import { FormItems } from "../../components/FormItems"
import { Input } from "../../components/Input"
import { TextArea } from "../../components/Textarea"
import { Alert } from "../../components/Alert"
import { SubmitButton } from "../../components/SubmitButton"
import { useForm } from "../../lib/form"
import { withPageWrapper } from "../../lib/pageWrapper"
import { canEditIdeas } from '../../../../server/src/utils/can';

export const EditIdeaPage = withPageWrapper ({
    authorizedOnly: true,
    useQuery: () => {
        const ideaId = useParams() as UpdateIdeaRouteParams
        return trpc.getIdea.useQuery({ id: ideaId.ideaId})
    },
    setProps: ({ queryResult, ctx, checkAccess, checkExists }) => {
        const idea = checkExists(queryResult.data.idea, 'Idea not found')
        checkAccess(canEditIdeas(ctx.my, idea), 'You can only edit your own ideas')
        return {
            idea
        }
    },
    title: ({ idea }) => `Edit idea: ${idea.title}`
})
(({ idea }) => {
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
})
