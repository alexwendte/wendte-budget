const categoryController = require('../controllers/categories')

function setupCategoryRoutes(router) {
  router.get('/', categoryController.getCategories)
}

module.exports = setupCategoryRoutes
