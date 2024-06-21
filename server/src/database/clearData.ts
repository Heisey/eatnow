
import chalk from 'chalk'

import * as DB from '.'
import * as Models from '../models'
import * as Services from '../services'

export const clearData = async () => {
  const dbConnect = await DB.connection()
  console.log(chalk.magenta.bold('Start Database purge'))
  
  const database = dbConnect.connection.db

  console.log(chalk.magenta.bold('Remove Firebase user sets'))
  let firebaseUsers = await Services.firebase.auth.listUsers(1000)

  while (firebaseUsers.users.length > 0) {
    await Services.firebase.auth.deleteUsers(firebaseUsers.users.map(dataSet => dataSet.uid))
    firebaseUsers = await Services.firebase.auth.listUsers(1000)
  }

  console.log(chalk.magenta.bold('Remove Collections users'))
  const collections = await database.listCollections().toArray()

  collections
    .map(dataSet => dataSet.name)
    .forEach(async (dataSet) => await database.dropCollection(dataSet))
    console.log(chalk.magenta.bold('Finish Database purge'))
}