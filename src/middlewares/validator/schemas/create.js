const Joi = require('joi')

const { ranks, suits } = require('../../../utils/deck')

const createSchema = Joi.object({
  decks: Joi
    .number()
    .min(0)
    .required(),

  options: Joi.object({
    without: Joi.object({
      ranks: Joi
        .array()
        .items(ranks)
        .unique(),

      suits: Joi
        .array()
        .items(suits)
        .unique()
    })
  })
}).required()

module.exports = createSchema
