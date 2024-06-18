
import * as I from '../interfaces'
import * as Keys from '../keys'
import * as Models from '../models'
import * as Utils from '../utilities'

export const getById = Utils.catchAsync(async (req, res, next) => {
  const categories = Object.values(Keys.menuCategories) 
  
  const records = await Models.Menu.findById(req.params.id).populate(categories)

  if (!records) return res.status(404).json({ message: 'no records found' })

  return res.status(200).json({ records })
})

export const updateById = Utils.catchAsync(async (req, res, next) => {
  const categories = Object.keys(req.body).filter(dataSet => dataSet !== '__v').filter(dataSet => dataSet !== 'id')

  const data = { ...req.body }
  
  delete data.__v
  delete data.id

  categories.map(category => {
    if (data[category][0] === null) return []
    data[category] = data[category].map((record: I.MenuItemRecord) => record.id)
  })
  
  const records = await Models.Menu.findByIdAndUpdate(req.params.id, data, { new: true })

  return res.status(204).json({ records })
})

export const addItem = Utils.catchAsync(async (req, res, next) => {
  const category = req.body.category as keyof I.MenuInfo
  
  const records = await Models.Menu.updateOne({ _id: req.params.id }, { $addToSet: { [category]: req.body.menuItemId }})

  res.status(204).json({ records })
})





// export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   try {    
//     const categories = Object.values(Keys.menuCategories) 
    
//     const records = await Models.Menu.findById(req.params.id).populate(categories)

//     if (!records) return res.status(404).json({ message: 'no records found' })

//     return res.status(200).json({ records })
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({
//       err: 'failed to create resturant'
//     })
//   }
// }


// export const updateById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   try {
//     const categories = Object.keys(req.body).filter(dataSet => dataSet !== '__v').filter(dataSet => dataSet !== 'id')

//     const data = { ...req.body }
    
//     delete data.__v
//     delete data.id

//     categories.map(category => {
//       if (data[category][0] === null) return []
//       data[category] = data[category].map((record: I.MenuItemRecord) => record.id)
//     })
    
//     const records = await Models.Menu.findByIdAndUpdate(req.params.id, data, { new: true })

//     return res.status(204).json({ records })
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({
//       err: 'failed to create resturant'
//     })
//   }
// }

// export const addItem = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   try {
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({
//       err: 'failed to add item'
//     })
//   }
// }