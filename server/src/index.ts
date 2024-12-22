import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'

const app = express()
app.use(cors())
app.get('/ping', (req, res) => {
  res.send('Pong')
})
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
)

app.listen(8080, () => {
  console.info('Server is running on port 8080')
})
