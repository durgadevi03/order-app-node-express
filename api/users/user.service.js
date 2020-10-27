const pool = require('../../config/database');

const registerQuery = `INSERT INTO users SET ?`;
const getAllUsersQuery = `SELECT id, first_name,last_name,email,role FROM users`;
const getUserByEmailId = `SELECT * FROM users WHERE email = ?`;
const getUserById = `SELECT * FROM users WHERE id = ?`;

module.exports = {

    getAllUsers: (callback) => {
        pool.query(getAllUsersQuery, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getUserByEmail: (data, callback) => {
        pool.query(getUserByEmailId, data, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    register: (data, callback) => {
        pool.query(registerQuery, data, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getUserById: (data, callback) => {
        pool.query(getUserById, data, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
}