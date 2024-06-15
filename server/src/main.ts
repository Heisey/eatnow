
require('dotenv').config();

import chalk from 'chalk'
import cors from 'cors'
import express from 'express'
import * as firebase from 'firebase-admin/app'
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
app.use('/api/v1/resturants', router.resturants)
app.use('/api/v1/user', router.user)

const start = async () => {
  firebase.initializeApp()
  app.listen(PORT, () => console.log(`${chalk.blue.bold('Server started on port')} ${chalk.yellowBright.bold(PORT)}`))
  await db.connection()
}

start()
