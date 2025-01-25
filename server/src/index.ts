import express from 'express'
import { trpcRouter } from './router'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'
import { AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'
import { env } from './lib/env'

(async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const app = express()
    app.use(cors())
    app.get('/ping', (req, res) => {
      res.send('Pong')
    })
    applyPassportToExpressApp(app, ctx)
    await applyTrpcToExpressApp(app, ctx, trpcRouter)
    app.listen(env.PORT, () => {
      console.info('Server is running on port ' + env.PORT)
    })
  } catch (e) {
    console.error(e)
    await ctx?.stop()
  }
})()

