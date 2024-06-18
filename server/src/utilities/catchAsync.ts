
import express from 'express'

export const catchAsync = (cb: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => cb(req, res, next).catch(err => {
    console.log(err)
    res.status(500).json({ err: 'failed to create resturant' })
  }) 
}