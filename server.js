require('dotenv').config();
const express = require('express');
const userRoutes = require('./api/users/user.routes');
const productRoutes = require('./api/products/products.router');
const orderRoutes = require('./api/orders/orders.routes');
const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send(`Welcome to Node Order App Home route!!`));

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    return res.status(err.status).send(err.message);
});




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));