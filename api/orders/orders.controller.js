const { placeOrder, mapOrderProducts, fetchAllOrders } = require('./orders.service');
const uuid = require('uuid');

module.exports = {

    /**
     *  Place a new Order by a customer
     *  Permit - CUSTOMER
     */
    postOrder: (req, res) => {
        const user_id = req.user.id;

        const { products } = req.body;
        let total = 0;
        products.map(product => total = total + product.price);

        const order = {
            payer_id: user_id,
            payment_id: uuid.v4(),
            payment_total: total,
            user_id: user_id,
        }

        placeOrder(order, async (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            await products.map(async product => {
                await mapOrderProducts(results.insertId, product.id, (err, results) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                });
            });

            res.status(200).json({
                message: 'Order placed successfully',
                user_id,
                products,
                total
            });
        })
    },

    /**
     *  Fetch All orders made by a customer
     *  Permit - CUSTOMER
     */
    fetchOrders: (req, res) => {
        const user_id = req.user.id;

        fetchAllOrders(user_id, (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            res.status(200).send(results);
        });
    }
}

