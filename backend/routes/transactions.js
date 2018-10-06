const transactionController = require('../controllers/transactions')

function setupTransactionRoutes(router) {
  router.get('/', transactionController.getTransactions)
  router.post('/', transactionController.createTransaction)
}

module.exports = setupTransactionRoutes
