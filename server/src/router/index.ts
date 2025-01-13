import { trpc } from '../lib/trpc'
import { getIdeasTrpcRoute } from '../router/getIdeas'
import { getIdeaTrpcRoute } from '../router/getIdea'
import { createIdeaTrpcRoute } from './createIdea'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute
})

export type TrpcRouter = typeof trpcRouter