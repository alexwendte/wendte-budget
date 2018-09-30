const mongoose = require('mongoose')

const Transaction = mongoose.model('Transaction')

exports.createTransaction = async(req, res) => {
  // console.log(req.body)
  const transaction = new Transaction(req.body)
  await transaction.save()
  res.send('Transaction Saved')
}
