const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authenticate = require(
  "../middleware/auth.middleware"
);
// GET /api/products - Get all products
router.get('/',authenticate, productController.getAllProducts);

// GET /api/products/:id - Get product by id
router.get('/:id',authenticate, productController.getProductById);

// POST /api/products - Create new product
router.post('/', authenticate, productController.createProduct);

// PUT /api/products/:id/status - Update product status
router.put('/:id/status', authenticate,  productController.updateProductStatus);

module.exports = router;