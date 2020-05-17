const { length } = require('ramda')
const mongoose = require('mongoose')

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const suits = ['clubs', 'diamonds', 'hearts', 'spades']

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

const GameSchema = new mongoose.Schema({
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

GameSchema.virtual('remainingCards').get(function () {
  return length(this.availableCards)
})

const Game = mongoose.model('Game', GameSchema)
module.exports = Game
