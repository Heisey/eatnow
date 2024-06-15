
import casual from "casual"
import mongoose from "mongoose"

import * as models from '../models'
import * as I from '../interfaces'




const generateResturantInfo = (menuId: mongoose.Types.ObjectId): I.ResturantInfo => {
  return {
    name: casual.name,
    address: casual.address,
    city: casual.city,
    country: casual.country,
    deliveryPrice: Math.ceil(Math.random() * 10),
    logo: 'https://source.unsplash.com/random',
    cuisine: [Math.floor(Math.random() * 7)],
    menuId
  }
}

interface NewUser extends I.UserInfo, I.Credentials {}

const generateUserData = async (resturantId: string, auth: any): Promise<NewUser | undefined> => {
  try {
    const email = casual.email
    const authUser = await auth.database.signUp({
      email,
      password: casual.password,
      connection: 'Username-Password-Authentication'
    })
  
    return {
      email,
      auth0id: authUser.data._id,
      name: casual.name,
      address: casual.address,
      city: casual.city,
      resturantId
    }
  } catch(err) {
    console.log('create user error')
    console.log(err)
  }
}

const generateMenuInfo = (resturantId: mongoose.Types.ObjectId): I.MenuItemInfo => ({
  name: casual.title,
  price: Math.ceil(Math.random() * 30),
  ingredients: casual.short_description,
  description: casual.short_description,
  image: 'https://source.unsplash.com/random',
  resturantId
})

const createMenuSection = async (resturantId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[]> => {
  const result: mongoose.Types.ObjectId[] = []

  for (let i = 0; i < 4; i++) {
    const item = await new models.MenuItem(generateMenuInfo(resturantId)).save()
    result.push(item.id)
  }

  return result
}




export const createUserAndResturant = async (auth: any) => {
  const menu = await new models.Menu()

  const resturant = await new models.Resturant(generateResturantInfo(menu.id)).save()

  menu.appetizers = await createMenuSection(resturant.id)
  menu.mains = await createMenuSection(resturant.id)
  menu.drinks = await createMenuSection(resturant.id)
  menu.deserts = await createMenuSection(resturant.id)

  await menu.save()

  const newUser = await generateUserData(resturant.id, auth)

  if (newUser) {
    const userRecord = await new models.User(newUser)
    return userRecord
  }
}
