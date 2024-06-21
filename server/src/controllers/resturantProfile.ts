
import express from 'express'

import * as Models from '../models'
import * as Utils from '../utilities'

export const create = Utils.catchAsync(async (req, res, next) => {
  const userData = await Models.User.findById(req.body.userId)

  if (!userData) return res.status(404).json({ err: 'failed to find user '})
  
  if (userData.resturantId) return res.status(409).json({ err: 'resturant already exists' })
  
  const menu = await new Models.Menu().save()

  const records = await new Models.Resturant({ ...req.body, menuId: menu.id }).save()

  userData.resturantId = records.id

  userData.save()

  res.status(201).json({ records })
})

export const getById = Utils.catchAsync(async (req, res, next) => {
  const records=  await Models.Resturant.findById(req.params.id)

  if (!records) return res.status(404).json({ message: 'resturant does not exist' })

  res.status(200).json({ records })
})
