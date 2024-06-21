
import * as Models from '../models'
import * as Services from '../services'
import * as Utils from '../utilities'


export const createUser = Utils.catchAsync(async (req, res, next) => {
  if (!req.body.firebaseId) return res.status(500).json({ status: 'failed', err: 'invalid credentials' })
    
  const existing = await Models.User.findOne({ auth0Id: req.body.auth0id })

  if (existing) return res.status(500).json({ status: 'failed', err: 'user already exists'})

  const records = await new Models.User({ ...req.body }).save()

  res.status(201).json({ records })
})

export const getUser = Utils.catchAsync(async (req, res, next) => {
  const records = await Models.User.findById(req.params.id).select(['-_id', '-__v'])

  if (!records) return res.status(404).json({ message: 'user does not exits' })
    
  res.status(200).json({ records })
})

export const getByEmail = Utils.catchAsync(async (req, res, next) => {
  const records = await Models.User.findOne({ email: req.params.email })

  if (!records) return res.status(404).json({ message: 'Could not find record' })
  
  res.status(200).json({ records })
})

export const updateUser = Utils.catchAsync(async (req, res, next) => {
  const user = await Models.User.findById(req.params.id)

  if (!user) return res.status(404).json({ records: undefined })

  user.name = req.body.name
  user.address = req.body.address
  user.city = req.body.city
  user.country = req.body.country

  user.save()
  
  res.status(204).json({ records: user })
})

export const loginUser = Utils.catchAsync(async (req, res, next) => {
  let user = await Models.User.findOne({ email: req.body.email })

  if (user) return res.status(200).json({ records: user })
    
  const firebaseUser = await Services.firebase.auth.getUserByEmail(req.body.email)
  console.log('puppy, ', firebaseUser.uid)
  const newUser = await new Models.User({ ...req.body, firebaseId: firebaseUser.uid }).save()
  
  if (!newUser) return res.status(500).json({ message: 'failed to create user' })

  res.status(201).json({ records: newUser })
})
