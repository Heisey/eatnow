
import mongoose from "mongoose";

import * as Keys from '../keys'

export interface ResturantInfo {
  name: string
  address: string
  city: string
  country: string
  deliveryPrice: number
  logo: string
  coverImage?: string
  cuisine: Keys.cuisine[]
  menuId?: mongoose.Types.ObjectId
  menuItemsCreated?: boolean
}