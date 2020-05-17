const express = require('express')
const helmet = require('helmet')

const router = require('./router')

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

module.exports = app