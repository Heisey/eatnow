
import mongoose from "mongoose";

import * as I from '../interfaces'

const UserSchema = new mongoose.Schema<I.UserRecord>({
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
  },
  firebaseId: {
    type: String,
    required: true,
    unique: true
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
