import { initTRPC } from "@trpc/server";
import { type TrpcRouter } from "../router";
import { type Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express'
import { AppContext } from './ctx';
import superjson from 'superjson';

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson
})
export const applyTrpcToExpressApp = (app: Express, AppContext: AppContext, trpcRouter: TrpcRouter) => {
    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
          router: trpcRouter,
          createContext: () => AppContext
        })
      )
}