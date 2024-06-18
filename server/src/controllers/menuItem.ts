
import * as Models from '../models'
import * as Utils from '../utilities'

export const create = Utils.catchAsync(async (req, res, next) => {
  const records = await new Models.MenuItem({ ...req.body }).save()

  res.status(201).json({ records })
})

export const getAllByResturantId = Utils.catchAsync(async (req, res, next) => {
  const records = await Models.MenuItem.find({ resturantId: req.params.resturantId })
  
  if (!records) return res.status(404).json({ err: 'failed to find menu items '})

  res.status(200).json({ records })
})
