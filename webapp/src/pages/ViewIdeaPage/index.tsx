import { useParams } from "react-router-dom"
import { trpc } from "../../lib/trpc"
import styles from './index.module.scss'
import { Segment } from "../../components/Segment"
import { format } from "date-fns"
import { getUpdateIdeaRoute, ViewIdeaRouteParams } from "../../lib/routes"
import { LinkButton } from "../../components/LinkButton"
import { withPageWrapper } from "../../lib/pageWrapper"
import { LikeButton } from "../../components/LikeButton"
import { canBlockIdeas, canEditIdeas } from '../../../../server/src/utils/can';
import { TrpcRouterOutput } from "@ideaapp/server/src/router"
import { useForm } from "../../lib/form"
import { Alert } from "../../components/Alert"
import { FormItems } from "../../components/FormItems"
import { SubmitButton } from "../../components/SubmitButton"


const BlockIdea = ({ idea }: {idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>}) => {
  const blockIdea = trpc.blockIdea.useMutation()
  const trpcUtils = trpc.useContext()
  const {formik, alertProps, buttonProps} = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id })
      await trpcUtils.getIdea.refetch({ id: idea.id })
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <SubmitButton type='primary' {...buttonProps}>Block Idea</SubmitButton>
      </FormItems>
    </form>
  )
}

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { id } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ id })
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    my: ctx.my
  }),
  showLoaderOnFetching: false,
  title: ({ idea }) => `View idea: ${idea.title}`
})(({ idea, my }) => {
  return (
    <Segment title={idea.title} size={2} description={idea.description}>
        <div className={styles.createdAt}>Created at: {format(idea.createdAt, 'dd.MM.yyyy HH:mm:ss')}</div>
        <div className={styles.author}>Author: {idea.author.nick} {idea.author.name ? ( `(${idea.author.name})`) : ('')}</div>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
        <div className={styles.likes}>
          Likes: {idea.likesCount}
          {my.id && (
            <>
            <br />
            <LikeButton idea={idea} />
            </>
          )}
        </div>
        {canEditIdeas(my, idea) && (
            <div className={styles.editButton}>
              <LinkButton to={getUpdateIdeaRoute({ ideaId: idea.id })}>Edit</LinkButton>
            </div>
        )}
        {canBlockIdeas(my) && (
            <div className={styles.blockIdea}>
              <BlockIdea idea={idea} />
            </div>
        )}
    </Segment>
  )
})

