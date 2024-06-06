
import * as Validator from 'zod'

import * as Core from '@/core'

interface UserValidation extends Core.I.UserEntityInfo {
  email?: string
}

export const userProfile: Validator.z.ZodType<UserValidation> = Validator.z.object({
  id: Validator.z.string(),
  email: Validator.z.string().optional(),
  name: Validator.z.string().min(1, 'name is required'),
  address: Validator.z.string().min(1, 'adress is required'),
  city: Validator.z.string().min(1, 'city is required'),
  country: Validator.z.string().min(1, 'country is required'),

})

export type UserProfileValidate = Validator.z.infer<typeof userProfile>