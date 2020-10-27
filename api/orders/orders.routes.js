require('dotenv').config();
const router = require('express').Router();
const { postOrder, fetchOrders } = require('./orders.controller');
const validation = require('../../middleware/validation');
const auth = require('../../middleware/auth');
const permit = require('../../middleware/permit');


/**
 *  Place new order by customer
 *  Permit - CUSTOMER
 */
router.post('/', validation.placeOrder, auth, permit('CUSTOMER'), postOrder);

/**
 *  Fetch details of all orders made by a customer
 *  Permit - CUSTOMER
 */
router.get('/', auth, permit('CUSTOMER'), fetchOrders);

module.exports = router;