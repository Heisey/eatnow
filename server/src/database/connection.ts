
require('dotenv').config();

import chalk from 'chalk'
import mongoose from 'mongoose'

export const connection = async () => {
  const db = mongoose.connect(process.env.DB_CONNECTION_STRING as string)

  mongoose.connection.on('connected', () => console.log(`${chalk.blue.bold('Database started successfully')} `))

  mongoose.connection.on('error', (err) => console.log(`${chalk.red.bold('Database connection error')}\n\n${err}`))

  return await db
}