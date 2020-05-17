const { Router } = require('express')
const { hello } = require('./controllers')

const router = Router()

router.get(
  '/hello',
  hello
)

module.exports = router
