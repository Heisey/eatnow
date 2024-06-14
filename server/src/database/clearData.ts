
import * as auth0 from 'auth0'

import * as db from '.'

const clearData = async () => {
  const dbConnect = await db.connection()

  const database = dbConnect.connection.db

  const collections = await database.listCollections().toArray()

  collections
    .map(dataSet => dataSet.name)
    .forEach(async (dataSet) => database.dropCollection(dataSet))

  // const auth = new auth0.ManagementClient({
  //   domain: process.env.AUTH_DOMAIN as string,
  //   // clientId: process.env.CLIENT_ID as string
  //   clientId: process.env.CLIENT_ID as string,
  //   // clientAssertionSigningKey
  // })
  
  // const authUser = auth.users.getAll()

  // console.log('puppy auth, ', authUser)
}

clearData()