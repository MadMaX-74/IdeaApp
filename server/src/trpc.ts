import { initTRPC } from '@trpc/server'

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

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return ideas
  }),
})

export type TrpcRouter = typeof trpcRouter
