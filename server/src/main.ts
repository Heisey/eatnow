
require('dotenv').config();

import chalk from 'chalk'
import cors from 'cors'
import express from 'express'
import helmut from 'helmet'
import morgan from 'morgan'

import * as db from './database'
import * as router from './router'

const PORT = parseInt(process.env.SERVER_PORT as string)

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(helmut())

app.use('/api/v1/menu', router.menu)
app.use('/api/v1/payment', router.payment)
app.use('/api/v1/resturant', router.resturant)
app.use('/api/v1/resturant_profile', router.resturantProfile)
app.use('/api/v1/user', router.user)

const start = async () => {
  app.listen(PORT, () => console.log(`${chalk.blue.bold('Server started on port')} ${chalk.yellowBright.bold(PORT)}`))

  await db.connection()
}

start()
