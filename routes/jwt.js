import jwt from 'express-jwt'
import config from '../config.js'

export default jwt({
  algorithms: ['HS256'],
  secret: config.publicKey
})
