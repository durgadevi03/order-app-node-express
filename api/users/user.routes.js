const router = require('express').Router();
const validate = require('../../middleware/validation');
const { registerUser, loginUser, getUserByUserId, getAllUsers } = require('./user.controller');

/**
 *  Get All Users from database
 */
router.get('/', getAllUsers);

/**
 *  Register a new user (ADMIN/CUSTOMER)
 */
router.post('/', validate.register, registerUser);

/**
 *  Login user
 */
router.post('/login', validate.login, loginUser);

/**
 *  Get User Details for user id
 */
router.get('/:id', getUserByUserId);


module.exports = router;