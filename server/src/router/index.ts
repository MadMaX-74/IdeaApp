import { trpc } from '../lib/trpc'
import { getIdeasTrpcRoute } from '../router/getIdeas'
import { getIdeaTrpcRoute } from '../router/getIdea'
import { createIdeaTrpcRoute } from './createIdea'
import { signUpTrpcRoute } from './signUp'
import { signInTrpcRoute } from './signIn'
import { getMyTrpcRoute } from './getMy'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMy: getMyTrpcRoute
})

export type TrpcRouter = typeof trpcRouter