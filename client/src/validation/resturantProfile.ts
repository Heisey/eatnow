
import * as Validator from 'zod'

import * as Core from '@/core'

export const resturantProfile: Validator.z.ZodType<Core.I.ResturantInfo> = Validator.z.object({
  userId: Validator.z.string(),
  name: Validator.z.string().min(1, 'name is required'),
  address: Validator.z.string().min(1, 'address is required'),
  city: Validator.z.string().min(1, 'city is required'),
  country: Validator.z.string().min(1, 'country is required'),
  deliveryPrice: Validator.z.coerce.number().transform(data => Number(data)),
  logo: Validator.z.string().min(1, 'logo url is required').optional(),
  converImage: Validator.z.string().optional(),
  cuisine: Validator.z.array(Validator.z.coerce.number().transform(data => Number(data))),
})

export type ResturantProfileValidation = Validator.z.infer<typeof resturantProfile>