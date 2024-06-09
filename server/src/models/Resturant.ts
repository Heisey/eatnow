
import mongoose from "mongoose";

import * as I from '../interfaces'
import * as Keys from '../keys'

const ResturantSchema = new mongoose.Schema<I.ResturantRecord>({
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  country: {
    type: String,
    require: true
  },
  deliveryPrice: {
    type: Number
  },
  logo: {
    type: String,
    require: true
  },
  coverImage: {
    type: String
  },
  cuisine: {
    type: [{ type: Number }],
    enum: Keys.cuisine,
    require: true
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  },
  menuItemsCreated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.model('Resturant', ResturantSchema)