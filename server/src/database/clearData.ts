
const auth0 = require('auth0')

import * as db from '.'



export const clearData = async () => {
  const dbConnect = await db.connection()

  const database = dbConnect.connection.db

  const collections = await database.listCollections().toArray()

  const client = await new auth0.ManagementClient({
    domain: process.env.AUTH_DOMAIN as string,
    clientId: process.env.CLIENT_ID as string,
    clientSecret: process.env.AUTH_SECRET as string,
    scope: 'read:users'
  })

  // console.log('puppy client, ', client)
  // const authUsers = await client.users.getAll()

  console.log('puppy uses, ', await client.users.getAll())
  // // @ts-ignore
  // authUsers.data.map(user => client.users.delete(user.user_id))
  collections
    .map(dataSet => dataSet.name)
    .forEach(async (dataSet) => await database.dropCollection(dataSet))

  // const auth = new auth0.ManagementClient({
  //   domain: process.env.AUTH_DOMAIN as string,
  //   // clientId: process.env.CLIENT_ID as string
  //   clientId: process.env.CLIENT_ID as string,
  //   // clientAssertionSigningKey
  // })
  
  // const authUser = auth.users.getAll()

  // console.log('puppy auth, ', authUser)
}