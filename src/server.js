require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./app')

const {
  API_PORT: apiPort,
  DB_URL: databaseUrl
} = process.env

mongoose.connect(
  databaseUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const database = mongoose.connection

database.on('error', error => {
  console.error('Error ocurred while connecting to database', error)
  process.exit(0)
})

database.once('open', () =>
  console.log('Database connection established successfully')
)

app.listen(apiPort, () => (
  console.log(`Card games API listening on port ${apiPort}!`)
))
