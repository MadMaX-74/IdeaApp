import express from 'express'
import { trpcRouter } from './router'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'
import { AppContext, createAppContext } from './lib/ctx'

(async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const app = express()
    app.use(cors())
    app.get('/ping', (req, res) => {
      res.send('Pong')
    })
    applyTrpcToExpressApp(app, ctx, trpcRouter)
    app.listen(8080, () => {
      console.info('Server is running on port 8080')
    })
  } catch (e) {
    console.error(e)
    await ctx?.stop()
  }
})()

