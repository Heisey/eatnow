
import express from 'express'
import firebase from 'firebase-admin/app-check'

export const jwtCheck = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const verified = await firebase.getAppCheck().verifyToken(token)

    if (!verified) return res.status(401).json({ message: 'Unauthorized'})

    next()
  } catch(err) {
    res.status(401).json({ message: 'Unauthorized'})
  }
}