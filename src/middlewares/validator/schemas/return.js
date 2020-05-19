const Joi = require('joi')

const { ranks, suits } = require('../../../utils/deck')

const returnSchema = Joi.object({
  cards: Joi.array().items({
    rank: Joi
      .string()
      .valid(ranks)
      .required(),

    suit: Joi
      .string()
      .valid(suits)
      .required()
  }).min(1).required(),

  position: Joi
    .string()
    .valid(['top', 'middle', 'bottom'])
    .required()
}).required()

module.exports = returnSchema
