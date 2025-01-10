import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

type Idea = {
  id: number
  title: string
  description: string
  text: string
}

const ideas: Idea[] = _.times(100, (i) => ({
  id: i + 1,
  title: `Idea ${i + 1}`,
  description: `Text for idea ${i + 1}`,
  text: _.times(10, (j) => `<p>Text paragraph ${j} of idea ${i + 1}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: ideas.map((idea) => _.pick(idea, ['id', 'title', 'description'])),
    }
  }),
  getIdea: trpc.procedure.input(z.object({ id: z.number() })).query(({ input }) => {
    const idea = ideas.find((idea) => idea.id === input.id)
    return {
      idea: idea || null
    }
  }),
})

export type TrpcRouter = typeof trpcRouter
