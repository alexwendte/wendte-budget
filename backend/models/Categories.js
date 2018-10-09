const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a category name',
  },
})

module.exports = mongoose.model('Categories', categoriesSchema)
