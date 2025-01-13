import { initTRPC } from "@trpc/server";
import { type TrpcRouter } from "../router";
import { type Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express'

export const trpc = initTRPC.create()
export const applyTrpcToExpressApp = (app: Express, trpcRouter: TrpcRouter) => {
    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
          router: trpcRouter,
        })
      )
}