import { useParams } from "react-router-dom"

export const ViewIdeaPage = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>View Idea { id }</h1>
    </div>
  )
}

