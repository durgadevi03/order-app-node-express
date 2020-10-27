const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('./products.service');

module.exports = {

    /**
    *  Fetch All Products from database
    */
    getAllProducts: (req, res) => {
        getAllProducts((err, results) => {
            if (err) {
                return res.status(500).send(err.message || 'Database Error');
            }

            res.status(200).send(results);
        });
    },

    /**
    *  Fetch product by product id
    */
    getProductById: (req, res) => {
        const id = req.params.id;

        getProductById(id, (err, results) => {
            if (err) {
                return res.status(500).send(err.message || 'Database Error');
            }

            if (results.length == 0) {
                return res.status(404).send(`Product id doesn't exist`);
            }

            res.status(200).send(results[0]);
        });
    },

    /**
    *  Add a new product
    *  Permit - ADMIN
    */
    addProduct: (req, res) => {
        const product = req.body;

        addProduct(product, (err, results) => {
            if (err || !results) {
                return res.status(500).send(err.message || 'Database Error');
            }

            res.status(200).send('Product added');
        });
    },

    /**
    *  Update an existing product
    *  Permit - ADMIN
    */
    updateProduct: (req, res) => {
        const id = req.params.id;
        const product = req.body;

        getProductById(id, (err, results) => {
            if (err) {
                return res.status(500).send(err.message || 'Database Error');
            }

            if (results.length == 0) {
                return res.status(404).send(`Product id doesn't exist`);
            }

            updateProduct(product, id, (err, results) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(200).send('Product updated');
            });
        });

    },

    /**
    *  Delete an existing product
    *  Permit - ADMIN
    */
    deleteProduct: (req, res) => {
        const id = req.params.id;

        getProductById(id, (err, results) => {
            if (err) {
                return res.status(500).send(err.message || 'Database Error');
            }

            if (results.length == 0) {
                return res.status(404).send(`Product id doesn't exist`);
            }

            deleteProduct(id, (err, results) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(200).send('Product Deleted');
            });
        });
    }
}