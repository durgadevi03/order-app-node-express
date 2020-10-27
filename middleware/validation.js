const { check, validationResult } = require('express-validator');

module.exports = {
    
    register: [
        [
            check(['first_name', 'last_name', 'email', 'password', 'isAdmin'], 'Mandatory field should not be empty').not().isEmpty(),
            check('email', 'Please enter a valid email').isEmail(),
            check('password', 'Password should have minimum of 6 characters').isLength({ min: 6 }),
            check('isAdmin', 'Field should be boolean').isBoolean()
        ], (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).send(errors);
            }

            next();
        }
    ],

    login: [
        [
            check(['email', 'password'], 'Mandatory field should not be empty').not().isEmpty(),
            check('email', 'Please enter a valid email').isEmail(),
            check('password', 'Password should have minimum of 6 characters').isLength({ min: 6 }),
        ], (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).send(errors);
            }

            next();
        }
    ],

    addProduct: [
        [
            check(['name', 'price', 'currency', 'description'], 'Mandatory field should not be empty').not().isEmpty(),
        ], (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).send(errors);
            }

            next();
        }
    ],

    placeOrder: [
        [
            check(['products'], 'Please select product to place an order').not().isEmpty()
        ], (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).send(errors);
            }

            next();
        }
    ]
};

// exports.register = [
//     [
//         check(['first_name', 'last_name', 'email', 'password', 'isAdmin'], 'Mandatory field should not be empty').not().isEmpty(),
//         check('email', 'Please enter a valid email').isEmail(),
//         check('password', "Password should have minimum of 6 characters").isLength({ min: 6 }),
//         check('isAdmin', 'Field should be boolean').isBoolean()
//     ], (req, res, next) => {

//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).send(errors);
//         }

//         next();
//     }
// ]

// exports.login = [
//     [
//         check(['email', 'password'], 'Mandatory field should not be empty').not().isEmpty(),
//         check('email', 'Please enter a valid email').isEmail(),
//         check('password', "Password should have minimum of 6 characters").isLength({ min: 6 }),
//     ], (req, res, next) => {

//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).send(errors);
//         }

//         next();
//     }
// ]

// exports.addProduct = [
//     [
//         check(['name', 'price', 'currency', 'description'], 'Mandatory field should not be empty').not().isEmpty(),
//     ], (req, res, next) => {

//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).send(errors);
//         }

//         next();
//     }
// ]