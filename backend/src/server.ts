import 'reflect-metadata'
import './models'

import express, { Express } from 'express'

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes'

async function buildApp(): Promise<Express> {
  dotenv.config()

  const app = express()

  await mongoose.connect(
    process.env.MONGO_URL || 'mongodb://localhost:27017/stock_tracker_test',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      promiseLibrary: global.Promise,
    },
  )

  app.use(express.json())
  app.use(routes)

  return app
}

function runServer(app: Express): void {
  app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!')
  })
}

buildApp().then(runServer)
