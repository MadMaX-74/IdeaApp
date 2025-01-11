import { Link } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()
  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <h1 className={styles.title}>Ideas App</h1>
      <div className={styles.ideas}>
        {data!.ideas.map((idea) => (
          <div className={styles.idea} key={idea.id}>
            <h2 className={styles.ideaTitle}>
              <Link className={styles.ideaLink} to={`/idea/${idea.id}`}>{idea.title}</Link>
              </h2>
            <p className={styles.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
