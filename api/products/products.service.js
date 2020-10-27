const pool = require('../../config/database');

const selectAllQuery = `SELECT * FROM products`;
const selectByIdQuery = `SELECT * FROM products WHERE id = ?`;
const addProductQuery = `INSERT INTO products SET ?`;
const updateProductQuery = `UPDATE products SET ? WHERE id = ?`;
const deleteProductQuery = `DELETE FROM products WHERE id = ?`;

module.exports = {

    /** 
     * Fetch All Products
     */
    getAllProducts: callback => {
        pool.query(selectAllQuery, (err, results) => {
            if (err) {
                callback(err);
            }
            return callback(null, results);
        });
    },

    /**
     * Fetch product by id
     */
    getProductById: (id, callback) => {
        pool.query(selectByIdQuery, id, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    /**
     * Add a product
     */
    addProduct: (product, callback) => {
        pool.query(addProductQuery, product, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    /**
     * Update a product
     */
    updateProduct: (product, id, callback) => {
        pool.query(updateProductQuery, [product, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    /**
     * Delete a product
     */
    deleteProduct: (product, callback) => {
        pool.query(deleteProductQuery, product, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
}