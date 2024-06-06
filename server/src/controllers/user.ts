
import express from 'express'

import * as Models from '../models'

export const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  try {
    if (!req.body.auth0id) return res.status(500).json({ status: 'failed', err: 'invalid credentials' })
      
    const user = await Models.User.findOne({ authId: req.body.auth0id })

    if (user) return res.status(500).json({ status: 'failed', err: 'user already exists'})

    const newUser = await new Models.User({ ...req.body, authId: req.body.auth0id }).save()

    res.status(201).json({
      status: 'successful',
      data: newUser
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      status: 'failed',
      err: 'failed to create user'
    })
  }
}

export const checkIfUserExists = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = await Models.User.findOne({ email: req.params.email }).select(['-__v'])
    
    res.status(200).json({
      records: user
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'server error'
    })
  }
}

export const getUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    console.log('puppies', req.params)
    // const user = await Models.User.findById(req.params.id).select(['-_id', '-__v'])
  
    // if (!user) return res.status(404).json({ message: 'user does not exits' })
      
    // res.status(200).json({
    //   record: user
    // })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'server error' })
  }
}

export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = await Models.User.findById(req.params.id)

    if (!user) return res.status(404).json({ records: undefined })

    user.name = req.body.name
    user.address = req.body.address
    user.city = req.body.city
    user.country = req.body.country

    user.save()
    
    res.status(204).json({ records: user })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'server error' })
  }
}