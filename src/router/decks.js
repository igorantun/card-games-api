const { Router } = require('express')

const { wrapAsync } = require('../utils')
const { validator } = require('../middlewares')
const { createController } = require('../controllers')
const { createSchema } = require('../middlewares/validator/schemas')

const router = Router()

router.post(
  '/decks',
  validator(createSchema),
  wrapAsync(createController)
)

module.exports = router
