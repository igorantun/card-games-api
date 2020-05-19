const Joi = require('joi')

const buySchema = Joi.object({
  cards: Joi
    .number()
    .min(1)
    .required()
}).required()

module.exports = buySchema
