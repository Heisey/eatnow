
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
})

ResturantSchema.set('toJSON', {
  transform: function(doc, rec) {
    rec.id = rec._id
    delete rec._id
    return rec
  },
  virtuals: true
})
// ResturantSchema.virtual('id').get(function() {
//   return this._id
// })

// ResturantSchema.set("toJSON", { virtuals: true })
// ResturantSchema.set('toObject', { virtuals: true})

// ResturantSchema.set('toJSON', {
//   transform: function(doc, rec) {
//     rec.id = rec._id
//     delete rec._id
//     return rec
//   },
//   virtuals: true
// })

// ResturantSchema.virtual('id').get(function(){
//   return this._id.toHexString()
// })

// ResturantSchema.set('toJSON', {
//   virtuals: true
// });

export default mongoose.model('Resturant', ResturantSchema)