
import * as Validator from 'zod'

import * as Core from '@/core'

export const menuItem: Validator.z.ZodType<Core.I.MenuItemInfo> = Validator.z.object({
  name: Validator.z.string().min(1, 'Menu item must have a name'),
  price: Validator.z.coerce.number({
    invalid_type_error: 'not right type',
    required_error: 'must fill in'
  }).min(0, 'Price item must have a min price of 0.99').transform(data => Number(data)),
  ingredients: Validator.z.string().min(1, 'Must list atleast 1 ingredient'),
  description: Validator.z.string().min(1, 'must provide a description'),
  resturantId: Validator.z.string().min(1, 'must provide a resturant id'),
  menuId: Validator.z.string().optional(),
  image: Validator.z.string()
})

export type MenuItemValidate = Validator.z.infer<typeof menuItem>