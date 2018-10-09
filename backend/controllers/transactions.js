const mongoose = require('mongoose')

const Transaction = mongoose.model('Transaction')

exports.createTransaction = async (req, res) => {
  const transaction = new Transaction(req.body)
  await transaction.save()
  res.send('Transaction Saved')
}

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({})
  // TODO get categories from db
  // const categories = await
  /**
   * TODO Need to only return the categories corresponding to the user
   * TODO I should do this by using the req.user's id as a db query
   */
  if (transactions) {
    return res.json({ transactions })
  }
  return res.status(404).send()
}
