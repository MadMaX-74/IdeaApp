import { trpc } from '../lib/trpc'
import { getIdeaTrpcRoute } from './ideas/getIdea'
import { signUpTrpcRoute } from './auth/signUp'
import { signInTrpcRoute } from './auth/signIn'
import { getMyTrpcRoute } from './auth/getMy'
import { updateIdeaTrpcRoute } from './ideas/updateIdea'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server/dist/core/types'
import { createIdeaTrpcRoute } from './ideas/createIdea'
import { getIdeasTrpcRoute } from './ideas/getIdeas'
import { updateProfileTrpcRoute } from './auth/updateProfile'
import { updatePasswordTrpcRoute } from './auth/updatePassword'
import { setIdeaLikeTrpcRoute } from './ideas/setIdeaLike'
import { blockIdeaTrpcRoute } from './ideas/blockIdea'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMy: getMyTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  setIdeaLike: setIdeaLikeTrpcRoute,
  blockIdea: blockIdeaTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>