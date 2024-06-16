
import chalk from 'chalk'

import * as DB from '.'
import * as Seed from '../seed'

const createUsers = async (args: number = 1000) => {
  // console.log(chalk.blueBright.bold('Clearing DataBase'))
  await DB.clearData()
  console.log(chalk.blueBright.bold('Starting Seed'))
  
  for (let i = 0; i < args; i ++) {
    const user = await Seed.createUserAndResturant()
    if (user?.id) console.log(chalk.yellow.bold(`Record ${user.id} created`))
    else console.log(chalk.magenta.bold('Unable to create record'))
  }

  console.log(chalk.blueBright.bold(`Created ${args} succesfully`))
  process.exit()
}

createUsers()