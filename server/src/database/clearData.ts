
import chalk from 'chalk'

import * as DB from '.'
import * as Models from '../models'
import * as Services from '../services'

export const clearData = async () => {
  const dbConnect = await DB.connection()
  console.log(chalk.magenta.bold('Start Database purge'))
  
  const database = dbConnect.connection.db
  const users = (await Models.User.find()).map(dataSet => dataSet.firebaseId)

  // for (let i = 0; i < users.length / 100; i++) {
  //   const index = i * 100
  //   const group = users.slice(index, index + 100)
  //   }

  if (users[0]) {
    console.log(chalk.magenta.bold('Remove Firebase users'))
    Services.firebase.auth.deleteUsers(users)
  }

  console.log(chalk.magenta.bold('Remove Collections users'))
  const collections = await database.listCollections().toArray()

  collections
    .map(dataSet => dataSet.name)
    .forEach(async (dataSet) => await database.dropCollection(dataSet))
    console.log(chalk.magenta.bold('Finish Database purge'))
}