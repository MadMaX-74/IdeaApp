import { Link } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { Segment } from '../../components/Segment'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()
  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
  return (
    <Segment title="Ideas App">
      <div className={styles.ideas}>
        {data!.ideas.map((idea) => (
          <div className={styles.idea} key={idea.id}>
            <Segment title={
                <Link className={styles.ideaLink} to={`/idea/${idea.id}`}>
                {idea.title}
              </Link>
            } size={2} description={idea.description}>
            </Segment>
          </div>
        ))}
      </div>
    </Segment>
  )
}
