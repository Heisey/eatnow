
import * as Models  from '../models'
import * as Utils from '../utilities'

export const getByCity = Utils.catchAsync(async (req, res, next) => {
  const name = req.query.name as string 
  const cuisines = req.query.cuisines as string[]

  const query: any = { city: new RegExp(req.params.city || '', 'i') }

  if (cuisines) query.cuisine = { $in: cuisines.map(dataSet =>  parseInt(dataSet)) }  
  if (name) query.name = { $regex: name, $options: 'i' }

  const total = await Models.Resturant.find(query).countDocuments()
  const limit = parseInt(req.query.limit as string) || 10
  const page = parseInt(req.query.page as string) || 1
  
  const pagination = {
    total: total,
    page,
    totalPages: Math.ceil(total / limit)
  }

  const records = await Models.Resturant.find(query).limit(limit).skip((page - 1) * limit)

  res.status(200).json({ records, pagination })
})