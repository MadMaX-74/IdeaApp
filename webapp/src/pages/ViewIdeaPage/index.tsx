import { useParams } from "react-router-dom"
import { trpc } from "../../lib/trpc"
import styles from './index.module.scss'
import { Segment } from "../../components/Segment"
import { format } from "date-fns"
import { getUpdateIdeaRoute, ViewIdeaRouteParams } from "../../lib/routes"
import { LinkButton } from "../../components/LinkButton"
import { withPageWrapper } from "../../lib/pageWrapper"
import { LikeButton } from "../../components/LikeButton"

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { id } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ id })
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    my: ctx.my
  }),
  showLoaderOnFetching: false
})(({ idea, my }) => {
  return (
    <Segment title={idea.title} size={2} description={idea.description}>
        <div className={styles.createdAt}>Created at: {format(idea.createdAt, 'dd.MM.yyyy HH:mm:ss')}</div>
        <div className={styles.author}>Author: {idea.author.nick} {idea.author.name ? ( `(${idea.author.name})`) : ('')}</div>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
        {my.id === idea.authorId && (
            <div className={styles.editButton}>
              <LinkButton to={getUpdateIdeaRoute({ ideaId: idea.id })}>Edit</LinkButton>
            </div>
        )}
        <div className={styles.likes}>
          Likes: {idea.likesCount}
          {my.id && (
            <>
            <br />
            <LikeButton idea={idea} />
            </>
          )}
          {my.id === idea.authorId && (
            <div className={styles.editButton}>
              <LinkButton to={getUpdateIdeaRoute({ ideaId: idea.id })}>Edit</LinkButton>
            </div>

          )}
        </div>
    </Segment>
  )
})

