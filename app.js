import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import userRouter from './routes/user.js'
import tokenRouter from './routes/token.js'

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

export default app
