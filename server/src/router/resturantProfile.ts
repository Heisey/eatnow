
import express from 'express'

import * as Controllers from '../controllers'
import * as Middleware from '../middleware'

const router = express.Router()

router.post('/', Middleware.auth.jwtCheck, Controllers.resturantProfile.create)

router.post('/menuItems', Middleware.auth.jwtCheck, Controllers.menuItem.create)

router.get('/:id', Controllers.resturantProfile.getById)

export default router