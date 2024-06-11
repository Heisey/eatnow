
import express from 'express'

import * as Models from '../models'

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const records = await new Models.MenuItem({ ...req.body }).save()

    res.status(201).json({ records })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      err: 'failed to create resturant'
    })
  }
}

export const getAllByResturantId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const records = await Models.MenuItem.find({ resturantId: req.params.resturantId })
    
    if (!records) return res.status(404).json({ err: 'failed to find menu items '})

    res.status(200).json({
      records
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      err: 'failed to create resturant'
    })

  }
}