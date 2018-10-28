const express = require('express')
const setupCategoryRoutes = require('./categories')
const setupTransactionRoutes = require('./transactions')

// router.post('/addTransaction', catchErrors(transactionsController.createTransaction))
// router.post('/addTransaction', catchErrors(transactionsController.createTransaction))

function setupRoutes(app) {
  const categoryRouter = express.Router()
  setupCategoryRoutes(categoryRouter)
  app.use('/api/categories', categoryRouter)

  const transactionRouter = express.Router()
  setupTransactionRoutes(transactionRouter)
  app.use('/api/transactions', transactionRouter)
}
module.exports = setupRoutes
