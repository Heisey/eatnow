
import express from 'express'

import * as Controllers from '../controllers'
import * as Middleware from '../middleware'

const router = express.Router()

router.get('/:resturantId/menuItems', Controllers.menuItem.getAllByResturantId)

router.get('/:id', Middleware.auth.jwtCheck, Controllers.menu.getById)

export default router