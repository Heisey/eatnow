
import * as Validator from 'zod'

import * as Core from '@/core'

export const menuItem: Validator.z.ZodType<Core.I.MenuItem> = Validator.z.object({
  // id: Validator.z.string(),
  name: Validator.z.string().min(1, 'Menu item must have a name'),
  price: Validator.z.coerce.number().min(0.99, 'Price item must have a min price of 0.99').transform(data => Number(data)),
  // ingredients: Validator.z.array(Validator.z.string()).min(1, 'Must list atleast 1 ingredient'),
  // description: Validator.z.string().min(1, 'must provide a description')
})

export type MenuItemValidate = Validator.z.infer<typeof menuItem>