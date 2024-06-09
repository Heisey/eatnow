
import * as Validator from 'zod'

import * as Core from '@/core'
import * as Validate from '.'

export const menu: Validator.z.ZodType<Core.I.MenuInfo> = Validator.z.object({
  // id: Validator.z.string(),
  appetizers: Validator.z.array(Validator.z.string()),
  mains: Validator.z.array(Validator.z.string()).optional(),
  drinks: Validator.z.array(Validator.z.string()).optional(),
  deserts: Validator.z.array(Validator.z.string()).optional(),
})

export type MenuValidate = Validator.z.infer<typeof menu>