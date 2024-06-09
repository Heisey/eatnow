
import express from 'express'

import * as Controllers from '../controllers'

const router = express.Router()

router.get('/:resturantId/menuItems', Controllers.menu.getAllByResturantId)

export default router