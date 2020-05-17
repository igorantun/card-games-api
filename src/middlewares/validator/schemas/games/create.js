const Joi = require('joi')

const { ranks, suits } = require('../../../../utils/deck')

const createGameSchema = Joi.object({
  deckCount: Joi
    .number()
    .min(0)
    .required(),

  deckOptions: Joi.object({
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

module.exports = createGameSchema
