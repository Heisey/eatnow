
import express from 'express'

import * as Models from '../models'

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    console.log('puppy create')
    const records = await new Models.MenuItem({ ...req.body }).save()

    res.status(201).json({ records })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      err: 'failed to create resturant'
    })
  }
}