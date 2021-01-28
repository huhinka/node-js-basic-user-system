import jwt from 'express-jwt'

export default jwt({
  algorithms: ['HS256'],
  // TODO put it into configuration
  secret: 'shhhhhhhared-secret'
})
