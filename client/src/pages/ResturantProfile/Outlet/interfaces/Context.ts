
import * as Core from '@/core'

export interface Context {
  resturant?: Core.I.ResturantRecord
  setResturant: (args?: Core.I.ResturantRecord) => void
}