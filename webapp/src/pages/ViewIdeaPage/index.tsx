import { useParams } from "react-router-dom"
import { trpc } from "../../lib/trpc"

export const ViewIdeaPage = () => {
  const { id } = useParams() as { id: string }

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ id: Number(id) })
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
    <div>
      <h1>{data.idea.title}</h1>
      <p>{data.idea.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </div>
  )
}

