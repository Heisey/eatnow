
require('dotenv').config();

import chalk from 'chalk'
import cors from 'cors'
import express from 'express'
import helmut from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'

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

app.listen(PORT, () => console.log(`${chalk.blue.bold('Server started on port')} ${chalk.yellowBright.bold(PORT)}`))

mongoose.connect(process.env.DB_CONNECTION_STRING as string).then(() => console.log(`${chalk.blue.bold('Database started successfully')} `))