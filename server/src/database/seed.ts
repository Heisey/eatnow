import auth0 from 'auth0'
// const auth0 = require('auth0')
import chalk from 'chalk'

import * as db from '.'
import * as seed from '../seed'

// const auth = new auth0.AuthenticationClient({
//   domain: process.env.AUTH_DOMAIN as string,
//   clientId: process.env.CLIENT_ID as string
// })
// const client = new auth0.ManagementClient({
//   domain: process.env.AUTH_DOMAIN as string,
//   clientId: process.env.CLIENT_ID as string,
//   clientSecret: process.env.AUTH_SECRET as string
// })

// client.users.
const createUsers = async (args: number = 1000) => {
  await db.clearData()
  // console.log(chalk.blueBright.bold('Starting Seed'))
  // for (let i = 0; i < args; i ++) {
  //   setTimeout(async () => {
  //     const user = await seed.createUserAndResturant(auth)
  //     if (user?.id) console.log(chalk.yellow.bold(`Record ${user.id} created`))
  //     else console.log(chalk.magenta.bold('Unable to create record'))
  //   }, 2000)
    
  // }

  // console.log(chalk.blueBright.bold(`Created ${args} succesfully`))
}

createUsers()