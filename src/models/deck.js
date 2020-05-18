const { length } = require('ramda')
const mongoose = require('mongoose')

const { ranks, suits } = require('../utils/deck')

const CardSchema = new mongoose.Schema({
  rank: {
    type: String,
    enum: ranks,
    required: true
  },
  suit: {
    type: String,
    enum: suits,
    required: true
  }
}, {
  _id: false
})

const DeckSchema = new mongoose.Schema({
  availableCards: {
    type: [CardSchema],
    required: true
  },
  takenCards: {
    type: [CardSchema],
    default: [],
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

DeckSchema.virtual('remainingCards').get(function () {
  return length(this.availableCards)
})

const Deck = mongoose.model('Deck', DeckSchema)
module.exports = Deck
