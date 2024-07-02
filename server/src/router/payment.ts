
import express from 'express'

import * as Controllers from '../controllers'
// import * as Middleware from '../middleware'

const router = express.Router()

router.get('/token', Controllers.payment.getToken)

router.post('/token', Controllers.payment.create)

export default router