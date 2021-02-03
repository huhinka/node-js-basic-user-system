import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mongoose from 'mongoose'

import indexRouter from './routes/index.js'
import userRouter from './routes/user.js'
import tokenRouter from './routes/token.js'
import config from './config.js'
import { handleErrors } from './error.js'

function connectWithRetry () {
  return mongoose.connect(config.mongodbHost, (error) => {
    if (error) {
      console.error(`Error in MongoDB Connection: ${error}`)
      setTimeout(connectWithRetry, 5000)
    } else {
      console.log(`MongoDB ${config.mongodbHost} Connected`)
    }
  })
}

connectWithRetry()

const { json, urlencoded, static: expressStatic } = express
const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressStatic(path.join(path.resolve(), 'public')))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/tokens', tokenRouter)

app.use(handleErrors)

export default app
