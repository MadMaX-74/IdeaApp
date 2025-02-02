import { useParams } from "react-router-dom"
import { trpc } from "../../lib/trpc"
import styles from './index.module.scss'
import { Segment } from "../../components/Segment"
import { format } from "date-fns"
import { getUpdateIdeaRoute } from "../../lib/routes"
import { LinkButton } from "../../components/LinkButton"
import { useMy } from "../../lib/ctx"

export const ViewIdeaPage = () => {
  const { id } = useParams() as { id: string }

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ id })
  const my = useMy()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
  if (!my) {
    return <div>Only for authorized users</div>
  }
  if (!data?.idea) {
    return <div>Idea not found</div>
  }
  const idea = data.idea
  return (
    <Segment title={idea.title} size={2} description={idea.description}>
        <div className={styles.createdAt}>Created at: {format(idea.createdAt, 'dd.MM.yyyy HH:mm:ss')}</div>
        <div className={styles.author}>Author: {idea.author.nick}</div>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
        {my.id === idea.authorId && (
            <div className={styles.editButton}>
              <LinkButton to={getUpdateIdeaRoute({ ideaId: idea.id })}>Edit</LinkButton>
            </div>
        )}
    </Segment>
  )
}

