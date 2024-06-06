
import * as express from 'express'
import * as Validator from 'express-validator'

export const validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = Validator.validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}