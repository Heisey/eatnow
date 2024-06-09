
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
    type: String,
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
  },
  image: {
    type: String,
    required: true
  }
})

MenuItemSchema.set('toJSON', {
  transform: function(doc, rec) {
    rec.id = rec._id
    delete rec._id
    return rec
  },
  virtuals: true
})

export default mongoose.model('MenuItem', MenuItemSchema)