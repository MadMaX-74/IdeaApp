export const App = () => {
  type Idea = {
    id: number
    title: string
    text: string
  }
  const ideas: Idea[] = [
    {
      id: 1,
      title: 'Idea 1',
      text: 'Text for idea 1',
    },
    {
      id: 2,
      title: 'Idea 2',
      text: 'Text for idea 2',
    },
    {
      id: 3,
      title: 'Idea 3',
      text: 'Text for idea 3',
    },
    {
      id: 4,
      title: 'Idea 4',
      text: 'Text for idea 4',
    },
    {
      id: 5,
      title: 'Idea 5',
      text: 'Text for idea 5',
    },
  ]
  return (
    <div>
      <h1>Ideas App</h1>
      <div>
        {ideas.map((idea) => (
          <div key={idea.id}>
            <h2>{idea.title}</h2>
            <p>{idea.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
