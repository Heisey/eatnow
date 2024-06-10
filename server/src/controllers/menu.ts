
import express from 'express'

import * as Models from '../models'

export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const records = await Models.Menu.findById(req.params.id)
    
    return res.status(200).json({ records })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      err: 'failed to create resturant'
    })
  }
}