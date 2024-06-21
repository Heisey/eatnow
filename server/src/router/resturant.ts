
import express from 'express'

import * as Controllers from '../controllers'

const router = express.Router()

router.get('/search/:city', Controllers.restuarnt.getByCity)

export default router