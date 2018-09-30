const express = require('express')

const router = express.Router()
const transactionsController = require('../controllers/transactionsController')
const { catchErrors } = require('../handlers/errorHandlers')

// router.post('/addTransaction', catchErrors(transactionsController.createTransaction))
router.post('/addTransaction', catchErrors(transactionsController.createTransaction))
module.exports = router
