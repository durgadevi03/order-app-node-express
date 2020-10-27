require('dotenv').config();
const { getUserByEmail, register, getAllUsers, getUserById } = require('./user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    /**
     * Register a new user
     */
    registerUser: async (req, res) => {
        try {
            const { first_name, last_name, email, password, isAdmin } = req.body;
            const salt = await bcrypt.genSalt(8);
            const user = {
                first_name,
                last_name,
                email,
                password: await bcrypt.hash(password, salt),
                role: isAdmin ? 'ADMIN' : 'CUSTOMER'
            }

            getUserByEmail(email, (err, results) => {
                if (err) {
                    return res.status(500).send(err.message || 'Database Error');
                }

                if (results.length === 0) {
                    register(user, (err, results) => {
                        if (err || !results) {
                            return res.status(500).send(err.message || 'Database Error');
                        }

                        res.status(201).send('Registration successful');
                    });
                } else {
                    return res.status(409).send('User already exists');
                }
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },


    /**
     * User Login 
     *
     */
    loginUser: (req, res) => {
        const { email, password } = req.body;

        getUserByEmail(email, (err, results) => {
            if (err) {
                return res.status(500).send(err.message || 'Database Error');
            }

            if (results.length == 0) {
                return res.status(404).send(`User doesn't exist`);
            }

            bcrypt.compare(password, results[0].password, (err, result) => {
                if (!err) {
                    if (!result) {
                        return res.status(400).send('Invalid Credentials');
                    }

                    const payload = {
                        id: results[0].id,
                        role: results[0].role
                    }

                    console.log(payload)
                    jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '2h' }, (err, token) => {
                        if (err) return res.status(500).send(err.message);
                        res.status(200).json({
                            message: 'Login successful',
                            token: token
                        })
                    })
                }
            });
        });
    },


    /**
     * 
     *  Fetch All Users
     */
    getAllUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                return res.status(500).send(err.message || 'Database Error');
            }
            res.status(200).send(results);
        });
    },


    /**
     * Get User by user id
     */
    getUserByUserId: (req, res) => {
        const id = req.params.id;

        try {
            getUserById(id, (err, results) => {
                if (err) {
                    return res.status(500).send(err.message || 'Database Error');
                }

                else if (results.length == 0) {
                    return res.status(404).send(`User doesn't exist`);
                }

                res.status(200).send(results[0]);
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

