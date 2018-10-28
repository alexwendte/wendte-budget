const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a user name',
  },
  categories: {
    type: [String],
    trim: true,
  },
})

module.exports = mongoose.model('User', userSchema)
