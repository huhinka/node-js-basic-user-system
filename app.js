import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const { json, urlencoded, static: expressStatic } = express
const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressStatic(path.join(path.resolve(), 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

export default app
