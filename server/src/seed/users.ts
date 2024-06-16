
import casual from "casual"

import * as I from '../interfaces'
import * as Models from '../models'
import * as Seed from '../seed'
import * as Services from '../services'

interface NewUser extends I.UserInfo, I.Credentials {
}

const generateUserData = (args: I.Credentials): NewUser => ({
  firebaseId: args.firebaseId,
  email: args.email,
  name: casual.name,
  address: casual.address,
  city: casual.city
})

export const createUser = async () => {
  const email = casual.email
  const password = casual.password
  const firebaseRes = await Services.firebase.auth.createUser({ email, password })
  if (!firebaseRes.uid) return
  return await new Models.User(generateUserData({ email, firebaseId: firebaseRes.uid }))
}

export const createUserAndResturant = async () => {
  const user = await createUser()
  
  if (!user) return 
  
  const resturant = await Seed.createResturantandFillMenu()

  user.resturantId = resturant.id

  user.save()

  return user
}
