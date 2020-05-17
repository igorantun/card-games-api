const { Router } = require('express')

const { wrapAsync } = require('../utils')
const { create } = require('../controllers/games')
const { validator } = require('../middlewares')
const { createGameSchema } = require('../middlewares/validator/schemas/games')

const router = Router()

router.post(
  '/games',
  validator(createGameSchema),
  wrapAsync(create)
)

module.exports = router
