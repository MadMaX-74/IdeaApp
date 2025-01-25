import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import { type TrpcRouter } from "../router";
import { type Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express'
import { type AppContext } from './ctx';
import superjson from 'superjson';
import { expressHandler } from 'trpc-playground/handlers/express'
import { type ExpressRequest } from "./types";


const getCreateTrpcContext = (
  appContext: AppContext
) =>
  ({req}: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    user: (req as ExpressRequest).user || null
  })

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>

export const trpc = initTRPC.context<TrpcContext>().create({
  transformer: superjson
})
export const applyTrpcToExpressApp = async (app: Express, AppContext: AppContext, trpcRouter: TrpcRouter) => {
    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
          router: trpcRouter,
          createContext: getCreateTrpcContext(AppContext)
        })
      )
    app.use('/trpc-playground', await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: trpcRouter,
      request: {
        superjson: true
      }
    }))
}