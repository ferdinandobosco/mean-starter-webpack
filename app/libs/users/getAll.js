const User = require('../../models/user');

/**
 * Get all users
 * @memberOf module:User
 * @function getAll
 *
 * @returns {Promise} - Returns a JSON with all users
 */


module.exports = () => new Promise((resolve, reject) => {
    User.find({}, (err, users) => {
        if (err) {
            reject(err);
        } else {
            resolve(users);
        }
    });
});
