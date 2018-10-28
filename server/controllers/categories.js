const mongoose = require('mongoose')

const User = mongoose.model('User')

exports.createCategory = async (req, res) => {
  // TODO add a category to the current user
  const category = ['hi']
  if (category) {
    return res.json({ category })
  }
  return res.status(404).send()
}

exports.getCategories = async (req, res) => {
  // TODO return the categories associated with the current user
  const categories = ['Groceries', 'Brianna a Babe']
  if (categories) {
    return res.json({ categories })
  }
  return res.status(404).send()
}

exports.updateCategory = async (req, res) => {
  // TODO update the specified category for the user
  const category = ['hi']
  if (category) {
    return res.json({ category })
  }
  return res.status(404).send()
}
exports.deleteCategory = async (req, res) => {
  // TODO delete the specified category from the user.
  const category = ['hi']
  if (category) {
    return res.json({ category })
  }
  return res.status(404).send()
}
