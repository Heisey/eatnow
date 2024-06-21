
import * as Models  from '../models'
import * as Utils from '../utilities'

export const getByCity = Utils.catchAsync(async (req, res, next) => {
  // const name = req.query.name as string || ''
  // const cuisines = req.query.cuisines as string || ''
  const query = {
    city: new RegExp(req.params.city || '', 'i')
  }
  
  const records = await Models.Resturant.find(query)

  res.status(200).json({ records })
})