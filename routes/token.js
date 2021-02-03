import { Router } from 'express'
import jwt from 'jsonwebtoken'

import config from '../config.js'
import userModel from './user.model.js'
import { BadRequestError } from '../error.js'
import convertPassword from './user.util.js'

const router = Router()

/**
 * POST a access token and return it.
 */
router.post('/', async (req, res, next) => {
  const name = req.body.name
  const password = req.body.password

  try {
    const user = await findUser(name, password)

    const payload = {
      name: user.name,
      admin: user.admin
    }
    const token = jwt.sign(payload, config.publicKey, {
      expiresIn: 60 * 2
    })

    res.send({ token })
  } catch (err) {
    next(err)
  }
})

async function findUser (name, password) {
  const users = await userModel.find({ name: name }).exec()

  if (users.length === 1) {
    const hash = convertPassword(password)
    const user = users[0]

    if (user.password !== hash) {
      throw new BadRequestError(`User ${name} not exists or password is invalid.`)
    } else {
      return user
    }
  } else {
    throw new BadRequestError(`User ${name} not exists or password is invalid.`)
  }
}

export default router
