require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    try {
        const header = req.header('Authorization');
        const token = header && header.slice(7);
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.user = {
            id: decoded.id,
            role: decoded.role
        }

        next();

    } catch (err) {
        res.status(400).json({
            message: 'Authentication Error',
            error: err.message
        });
    }

}

module.exports = auth;
