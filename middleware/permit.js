const permit = (...permitRoles) => {
    return (req, res, next) => {
        try {
            const { user } = req;
            if (user && permitRoles.includes(user.role)) {
                next();
            } else {
                return res.status(403).send('Forbidden');
            }

        } catch (err) {
            return res.status(500).json({
                message: 'Authorization Error',
                error: err.message
            });
        }
    }
}
module.exports = permit;