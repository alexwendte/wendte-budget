const mongoose = require('mongoose')

const Transaction = mongoose.model('Transaction')

exports.createTransaction = async(req, res) => {
  // console.log(req.body)
  const transaction = new Transaction(req.body)
  await transaction.save()
  res.send('Transaction Saved')
}

exports.getTransactions = (req, res) => {
  // TODO get categories from db
  // const categories = await
  /**
   * TODO Need to only return the categories corresponding to the user
   * TODO I should do this by using the req.user's id as a db query
   */
  const transactions = ['newObject', 'SecondObject']
  if (transactions) {
    return res.json({ transactions })
  }
  return res.status(404).send()
}
