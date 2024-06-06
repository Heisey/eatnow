
import mongoose from "mongoose";

export interface MenuItemInfo {
  name: string
  price: number
  ingredients: string[]
  description: string
  resturantId: mongoose.Types.ObjectId
  menuId?: mongoose.Types.ObjectId
}