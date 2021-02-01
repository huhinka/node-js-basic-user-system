import { Router } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import config from '../config.js'
import userModel from './user.model.js'
const router = Router()

/**
 * POST a access token and return it.
 */
router.post('/', (req, res) => {
  const name = req.body.name
  const password = req.body.password

  try {
    const user = findUser(name, password)

    const payload = {
      name: user.name,
      admin: user.admin
    }
    const token = jwt.sign(payload, config.publicKey, {
      expiresIn: 60 * 2
    })

    res.send({ token })
  } catch (err) {
    res.sendStatus(400).send(err)
  }
})

function findUser (name, password) {
  userModel.find({ name: name }).exec((err, users) => {
    if (err) {
      throw Error(err)
    } else {
      if (users.length !== 1) {
        throw Error(`User ${name} not exists or password is invalid.`)
      } else {
        const hash = crypto.createHash('md5').update(password).digest('hex')
        const user = users[0]

        if (user.password !== hash) {
          throw Error(`User ${name} not exists or password is invalid.`)
        } else {
          return user
        }
      }
    }
  })
}

export default router
