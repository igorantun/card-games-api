require('dotenv').config()

const express = require('express')
const helmet = require('helmet')

const app = express()
const port = process.env.API_PORT

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.status(200).send('Hello World!'))

app.listen(port, () => (
  console.log(`Card games API listening on port ${port}!`)
))

module.exports = app
