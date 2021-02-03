import crypto from 'crypto'

export default function convertPassword (password) {
  // TODO implement by proper way
  return crypto.createHash('md5').update(password).digest('hex')
}
