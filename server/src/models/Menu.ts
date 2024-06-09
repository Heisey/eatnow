
import mongoose from "mongoose";

import * as I from '../interfaces'
import * as Models from '.'

const MenuSchema = new mongoose.Schema<I.MenuRecord>({
  appetizers: {
    type: [mongoose.Types.ObjectId],
    ref: 'MenuItem'
  },
  mains: {
    type: [mongoose.Types.ObjectId],
    ref: 'MenuItem'
  },
  drinks: {
    type: [mongoose.Types.ObjectId],
    ref: 'MenuItem'
  },
  deserts: {
    type: [mongoose.Types.ObjectId],
    ref: 'MenuItem'
  }
})

export default mongoose.model('Menu', MenuSchema)