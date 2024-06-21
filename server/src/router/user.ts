
import express from 'express'

import * as Controllers from '../controllers'
import * as Middleware from '../middleware'
import * as Validate from '../validators'

const router = express.Router()

router.post('/', Middleware.auth.jwtCheck, Controllers.user.createUser)

router.post('/login', Middleware.auth.jwtCheck, Controllers.user.loginUser)

router.get('/info/:email', Middleware.auth.jwtCheck, Controllers.user.getByEmail)

router.get('/:id', Middleware.auth.jwtCheck, Controllers.user.getUser)

router.put('/:id', Middleware.auth.jwtCheck, Validate.userInfo, Controllers.user.updateUser)

export default router