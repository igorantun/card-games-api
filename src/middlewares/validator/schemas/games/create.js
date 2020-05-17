const Joi = require('joi')

const createGameSchema = Joi.object({
  decks: Joi
    .number()
    .min(0)
    .required()
}).required()

module.exports = createGameSchema
