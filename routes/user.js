import { Router } from 'express'
import { BadRequestError, GeneralError } from '../error.js'

import jwt from './jwt.js'
import UserModel from './user.model.js'

const router = Router()

/**
 * GET users listing.
 *
 * Protected by JWT Auth.
 */
router.get('/', jwt, async (req, res) => {
  if (!req.user.admin) {
    return res.sendStatus(401)
  } else {
    const users = await UserModel.find({}).exec()
    res.json(users)
  }
})

/**
 * POST a user
 */
router.post('/', async (req, res, next) => {
  const newUser = new UserModel({
    name: req.body.name,
    password: req.body.password
  })

  const users = await UserModel.find({ name: req.body.name }).exec()

  if (users.length !== 0) {
    next(new BadRequestError(`User ${req.body.name} exists.`))
  } else {
    newUser.save((err, user) => {
      if (err) {
        next(new GeneralError(err))
      } else {
        res.json({
          msg: 'User successfully added!',
          user
        })
      }
    })
  }
})

export default router
