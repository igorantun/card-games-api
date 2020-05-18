const express = require('express')
const helmet = require('helmet')

const router = require('./router')
const { errorHandler } = require('./middlewares')
const { NotFoundError } = require('./utils/errors')

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.use(errorHandler)

app.use((req, res, next) =>
  errorHandler(new NotFoundError(), req, res, next))

module.exports = app
