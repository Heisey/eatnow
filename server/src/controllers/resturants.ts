
import express from 'express'

import * as Models from '../models'

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userData = await Models.User.findById(req.body.userId)

    if (!userData) return res.status(404).json({ err: 'failed to find user '})
    
    if (userData.resturantId) return res.status(409).json({ err: 'resturant already exists' })
    
    const menu = await new Models.Menu().save()

    const resturant = await new Models.Resturant({ ...req.body, menuId: menu.id }).save()

    userData.resturantId = resturant.id

    userData.save()

    res.status(201).json({
      records: resturant
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      err: 'failed to create resturant'
    })
  }
}

export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id
  const record =  await Models.Resturant.findOne({ id })
  console.log('puppy id, ', id === '66657941d356e5cadb1c81aa', record)

  if (!record) return res.status(404).json({ message: 'resturant does not exist' })

  res.status(200).json({
    records: record
  })
}