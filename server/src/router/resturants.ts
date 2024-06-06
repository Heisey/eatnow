
import express from 'express'

import * as Controllers from '../controllers'
import * as Middleware from '../middleware'

const router = express.Router()

router.use(Middleware.auth.jwtCheck)

router.post('/', Controllers.resturant.create)

router.get('/:id', Controllers.resturant.getById)

export default router