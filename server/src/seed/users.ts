
import casual from "casual"

import * as I from '../interfaces'
import * as Models from '../models'
import * as Seed from '../seed'
import * as Services from '../services'
import * as Utils from '../utilities'

interface NewUser extends I.UserInfo, I.Credentials {
  city?: string
}

interface GenerateUserData extends I.Credentials {
  city?: string
}

const generateUserData = (args: GenerateUserData): NewUser => ({
  firebaseId: args.firebaseId,
  email: args.email,
  name: casual.name,
  address: casual.address,
  city: args.city || casual.city
})

export const createUser = async (args?: { city?: string }) => {
  const email = casual.email
  const password = Utils.generatePassword()
  const firebaseRes = await Services.firebase.auth.createUser({ email, password })
  if (!firebaseRes.uid) return
  return await new Models.User(generateUserData({ email, firebaseId: firebaseRes.uid, city: args?.city }))
}

export const createUserAndResturant = async (args?: { city?: string }) => {
  const user = await createUser(args)
  
  if (!user) return 
  
  const resturant = await Seed.createResturantandFillMenu(args)

  user.resturantId = resturant.id

  user.save()

  return user
}
