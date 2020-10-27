const pool = require('../../config/database');

const postOrder = `INSERT INTO orders SET ?`;
const mapOrderItems = `INSERT INTO order_items (order_id,product_id) VALUES (?, ?)`;
const getOrders = `SELECT id, payer_id,payment_id,payment_total FROM orders WHERE user_id = ?`;

module.exports = {

    /**
     * Place a new order
     */
    placeOrder: (data, callback) => {
        pool.query(postOrder, data, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    /**
     * Helper function for mapping user orders and products 
     */
    mapOrderProducts: (order_id, product_id, callback) => {
        pool.query(mapOrderItems, [order_id, product_id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    /**
     * Fetch all orders made by customer
     */
    fetchAllOrders: (user_id, callback) => {
        pool.query(getOrders, user_id, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
}