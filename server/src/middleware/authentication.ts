
import express from 'express'

import * as Services from '../services'

export const jwtCheck = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    
    const decoded = await Services.firebase.auth.verifyIdToken(token)

    if (!decoded) return res.status(401).json({ message: 'Unauthorized'})

    next()
  } catch(err) {
    console.log(err)
    res.status(401).json({ message: 'Unauthorized'})
  }
}