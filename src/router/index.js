const { Router } = require('express')
const decksRouter = require('./decks')

const router = Router()

router.use(decksRouter)

module.exports = router
