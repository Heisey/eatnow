
import mongoose from "mongoose";

import * as I from '../interfaces'

const UserSchema = new mongoose.Schema<I.UserRecord>({
  auth0id: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  name: {
    type: String,

  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  resturantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resturant'
  }
}, {
  timestamps: true
})

UserSchema.set('toJSON', {
  transform: function(doc, rec) {
    rec.id = rec._id
    delete rec._id
    return rec
  },
  virtuals: true
})

export default mongoose.model('User', UserSchema)
