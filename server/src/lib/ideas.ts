import _ from 'lodash'

type Idea = {
    id?: number
    title: string
    description: string
    text: string
  }
  
export const ideas: Idea[] = _.times(100, (i) => ({
    id: i + 1,
    title: `Idea ${i + 1}`,
    description: `Text for idea ${i + 1}`,
    text: _.times(10, (j) => `<p>Text paragraph ${j} of idea ${i + 1}...</p>`).join(''),
}))