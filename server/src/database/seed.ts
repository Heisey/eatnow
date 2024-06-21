
import casual from 'casual'
import chalk from 'chalk'

import * as DB from '.'
import * as Seed from '../seed'

const createUsers = async (args: number = 100) => {
  await DB.clearData()
  console.log(chalk.blueBright.bold('Starting Seed'))
  
  
  for (let i = 0; i < args; i ++) {
    const amountOfCities = Math.ceil(Math.random() * 4)
    let city = casual.city
    for (let count = 0; count < amountOfCities; count++) {
      const user = await Seed.createUserAndResturant({ city })
      if (user?.id) console.log(chalk.yellow.bold(`Record ${user.id} created`))
      else console.log(chalk.magenta.bold('Unable to create record'))
    }
    city = casual.city
  }

  console.log(chalk.blueBright.bold(`Created ${args} succesfully`))
  process.exit()
}

createUsers()