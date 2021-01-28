import { Router } from 'express'
import jwt from './jwt.js'
const router = Router()

/**
 * GET users listing.
 *
 * Protected by JWT Auth.
 */
router.get('/', jwt, (req, res) => {
  res.send('respond with a resource')
})

/**
 * POST a user
 */
router.post('/', (req, res) => {
  // TODO
})

export default router
