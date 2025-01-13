import { trpc } from '../lib/trpc'
import { getIdeasTrpcRoute } from '../router/getIdeas'
import { getIdeaTrpcRoute } from '../router/getIdea'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute
})

export type TrpcRouter = typeof trpcRouter