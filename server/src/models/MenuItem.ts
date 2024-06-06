
import mongoose from "mongoose";

import * as I from '../interfaces'

const MenuItemSchema = new mongoose.Schema<I.MenuItemRecord>({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  ingredients: {
    type: [{ type: String }],
    require: true
  },
  description: {
    type: String,
    require: true
  },
  resturantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }
})

export default mongoose.model('MenuItem', MenuItemSchema)