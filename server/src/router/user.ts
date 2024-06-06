
import express from 'express'

import * as Controllers from '../controllers'
import * as Middleware from '../middleware'
import * as Validate from '../validators'

const router = express.Router()

router.post('/', Middleware.auth.jwtCheck, Controllers.user.createUser)

router.get('/:id', Middleware.auth.jwtCheck, Controllers.user.getUser)

router.put('/:id', Middleware.auth.jwtCheck, Validate.userInfo, Controllers.user.updateUser)

router.get('/exists/:email', Controllers.user.checkIfUserExists)

export default router