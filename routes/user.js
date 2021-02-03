import { Router } from 'express'

import jwt from './jwt.js'
import UserModel from './user.model.js'

const router = Router()

/**
 * GET users listing.
 *
 * Protected by JWT Auth.
 */
router.get('/', jwt, (req, res) => {
  if (!req.user.admin) {
    return res.sendStatus(401)
  } else {
    const query = UserModel.find({})

    query.exec((err, users) => {
      if (err) {
        res.sendStatus(400).send(err)
      } else {
        res.json(users)
      }
    })
  }
})

/**
 * POST a user
 */
router.post('/', (req, res) => {
  const newUser = new UserModel({
    name: req.body.name,
    password: req.body.password
  })

  UserModel.find({ name: req.body.name }).exec((err, users) => {
    if (err) {
      res.send(400).send(err)
    } else {
      if (users.length !== 0) {
        res.send(400).send(`User ${req.body.name} exists.`)
      } else {
        newUser.save((err, user) => {
          if (err) {
            res.send(400).send(err)
          } else {
            res.json({
              msg: 'User successfully added!',
              user
            })
          }
        })
      }
    }
  })
})

export default router
