const { Router } = require('express')
const gamesRouter = require('./games')

const router = Router()

router.use(gamesRouter)

module.exports = router
