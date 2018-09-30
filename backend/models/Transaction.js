const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please enter an item name',
  },
  cost: {
    type: String,
    trim: true,
    required: 'Please enter an item cost',
  },
  category: {
    type: String,
    trim: true,
    required: 'Please enter an category',
  },
  date: {
    type: String,
    trim: true,
    required: 'Please enter a date',
  },
  type: {
    type: String,
    required: true,
  },
  notes: String,
})

module.exports = mongoose.model('Transaction', transactionSchema)
