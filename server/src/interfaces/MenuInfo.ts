
import * as mongoose from 'mongoose'

import * as I from '.'

export interface MenuInfo {
  appetizers?: mongoose.Types.ObjectId[]
  mains?: mongoose.Types.ObjectId[]
  drinks?: mongoose.Types.ObjectId[]
  deserts?: mongoose.Types.ObjectId[]
}