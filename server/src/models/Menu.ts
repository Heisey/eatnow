
import mongoose from "mongoose";

import * as I from '../interfaces'
import * as Models from '.'

const MenuSchema = new mongoose.Schema<I.MenuRecord>({
  appetizers: {
    type: [Models.MenuItem.schema]
  },
  mains: {
    type: [Models.MenuItem.schema]
  },
  drinks: {
    type: [Models.MenuItem.schema]
  },
  deserts: {
    type: [Models.MenuItem.schema]
  }
})

export default mongoose.model('Menu', MenuSchema)