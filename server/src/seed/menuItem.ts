
import casual from "casual"
import mongoose from "mongoose"

import * as I from '../interfaces'
import * as Models from '../models'

const generateMenuInfo = (resturantId: mongoose.Types.ObjectId): I.MenuItemInfo => ({
  name: casual.title,
  price: Math.ceil(Math.random() * 30),
  ingredients: casual.short_description,
  description: casual.short_description,
  image: 'https://source.unsplash.com/random',
  resturantId
})

export const createMenuItem = async (resturantId: mongoose.Types.ObjectId) => await new Models.MenuItem(generateMenuInfo(resturantId)).save()
