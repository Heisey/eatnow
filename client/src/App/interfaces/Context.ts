
import * as Core from '@/core'

export interface Context {
  user?: Core.I.UserRecord
  setUser: (args?: Core.I.UserRecord) => void
}