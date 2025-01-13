import express from 'express'
import { trpcRouter } from './router'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'

const app = express()
app.use(cors())
app.get('/ping', (req, res) => {
  res.send('Pong')
})
applyTrpcToExpressApp(app, trpcRouter)

app.listen(8080, () => {
  console.info('Server is running on port 8080')
})
