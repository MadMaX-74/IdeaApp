import { useParams } from "react-router-dom"
import { trpc } from "../../lib/trpc"
import styles from './index.module.scss'
import { Segment } from "../../components/Segment"
import { format } from "date-fns"

export const ViewIdeaPage = () => {
  const { id } = useParams() as { id: string }

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ id })
  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
  if (!data?.idea) {
    return <div>Idea not found</div>
  }
  return (
    <Segment title={data.idea.title} size={2} description={data.idea.description}>
        <div className={styles.createdAt}>Created at: {format(data.idea.createdAt, 'dd.MM.yyyy HH:mm:ss')}</div>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  )
}

