
import mongoose from "mongoose"

import * as Models from '../models'
import * as Seed from '.'

export const createMenuSection = async (resturantId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[]> => {
  const result: mongoose.Types.ObjectId[] = []

  for (let i = 0; i < 4; i++) result.push((await Seed.createMenuItem(resturantId))._id)

  return result
}

export const createMenuAndFill = async (resturantId: mongoose.Types.ObjectId) => {
  const menu = await new Models.Menu()
  
  menu.appetizers = await createMenuSection(resturantId)
  menu.mains = await createMenuSection(resturantId)
  menu.drinks = await createMenuSection(resturantId)
  menu.deserts = await createMenuSection(resturantId)

  await menu.save()
}

export const createMenu = async () => await new Models.Menu().save()