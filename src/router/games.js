const { Router } = require('express')

const { create } = require('../controllers/games')
const { validator } = require('../middlewares')
const { createGameSchema } = require('../middlewares/validator/schemas/games')

const router = Router()

router.post(
  '/games',
  validator(createGameSchema),
  create
)

module.exports = router
