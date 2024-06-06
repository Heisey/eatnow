
import * as Validator from 'zod'

import * as Core from '@/core'
import * as Validate from '.'

export const menu: Validator.z.ZodType<Core.I.MenuInfo> = Validator.z.object({
  // id: Validator.z.string(),
  appetizers: Validator.z.array(Validate.menuItem),
  mains: Validator.z.array(Validate.menuItem).optional(),
  drinks: Validator.z.array(Validate.menuItem).optional(),
  deserts: Validator.z.array(Validate.menuItem).optional(),
})

export type MenuValidate = Validator.z.infer<typeof menu>