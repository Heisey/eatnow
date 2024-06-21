
import express from 'express'

import * as Controllers from '../controllers'
import * as Middleware from '../middleware'

const router = express.Router()

router.use(Middleware.auth.jwtCheck)

router.post('/', Controllers.resturantProfile.create)

router.post('/menuItems', Controllers.menuItem.create)

router.get('/:id', Controllers.resturantProfile.getById)

export default router