import { Link } from 'react-router-dom'
import { trpc } from '../../lib/trpc'

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
      <h1>Ideas App</h1>
      <div>
        {data!.map((idea) => (
          <div key={idea.id}>
            <h2><Link to={`/idea/${idea.id}`}>{idea.title}</Link></h2>
            <p>{idea.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
