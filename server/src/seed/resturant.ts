
import casual from "casual"
import mongoose from "mongoose"

import * as I from '../interfaces'
import * as Models from '../models'
import * as Seed from '.'

const generateResturantInfo = (menuId: mongoose.Types.ObjectId, city?: string): I.ResturantInfo => {
  return {
    name: casual.name,
    address: casual.address,
    city: city || casual.city,
    country: casual.country,
    deliveryPrice: Math.ceil(Math.random() * 10),
    logo: 'https://source.unsplash.com/random',
    cuisine: [Math.floor(Math.random() * 7)],
    menuId
  }
}

export const createResturantandFillMenu = async (args?: { city?: string }) => {
  const menu = await Seed.createMenu()

  const resturant = await new Models.Resturant(generateResturantInfo(menu.id, args?.city)).save()

  menu.appetizers = await Seed.createMenuSection(resturant.id)
  menu.mains = await Seed.createMenuSection(resturant.id)
  menu.drinks = await Seed.createMenuSection(resturant.id)
  menu.deserts = await Seed.createMenuSection(resturant.id)

  await menu.save()

  return resturant
}