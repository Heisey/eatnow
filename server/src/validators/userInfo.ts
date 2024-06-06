
import * as Validator from 'express-validator'

import * as Middleware from '../middleware'

export const userInfo = [
  Validator.body('name').isString().withMessage('Must be a string'),
  Validator.body('name').notEmpty().withMessage('Must enter name'),
  Validator.body('address').isString().withMessage('Must be a string'),
  Validator.body('address').notEmpty().withMessage('Must enter a address'),
  Validator.body('city').isString().withMessage('Must be a string'),
  Validator.body('city').notEmpty().withMessage('Must enter a city'),
  Validator.body('country').isString().withMessage('Must be a string'),
  Validator.body('country').notEmpty().withMessage('Must enter a country'),
  Middleware.validate
]