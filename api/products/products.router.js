const router = require('express').Router();
const validation = require('../../middleware/validation');
const auth = require('../../middleware/auth');
const permit = require('../../middleware/permit');
const { getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct } = require('./products.controller');

/**
 *  Fetch All Products from database
 */
router.get('/', getAllProducts);

/**
 *  Fetch product by product id
 */
router.get('/:id', getProductById);

/**
 *  Add a new product
 *  Permit - ADMIN
 */
router.post('/', validation.addProduct, auth, permit('ADMIN'), addProduct);

/**
 *  Update an existing product
 *  Permit - ADMIN
 */
router.patch('/:id', auth, permit('ADMIN'), updateProduct);

/**
 *  Delete an existing product
 *  Permit - ADMIN
 */
router.delete('/:id', auth, permit('ADMIN'), deleteProduct);

module.exports = router;