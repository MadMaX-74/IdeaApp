import { trpc } from '../lib/trpc'
import { getIdeasTrpcRoute } from '../router/getIdeas'
import { getIdeaTrpcRoute } from '../router/getIdea'
import { createIdeaTrpcRoute } from './createIdea'
import { signUpTrpcRoute } from './signUp'
import { signInTrpcRoute } from './signIn'
import { getMyTrpcRoute } from './getMy'
import { updateIdeaTrpcRoute } from './updateIdea'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server/dist/core/types'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMy: getMyTrpcRoute
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>