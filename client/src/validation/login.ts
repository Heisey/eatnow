
import * as Validator from 'zod'

export const login = Validator.z.object({
  email: Validator.z.string().min(1, 'Email is required'),
  password: Validator.z.string().min(8, 'Password must me atleast 8 characters')
})

export type LoginValidate = Validator.z.infer<typeof login>