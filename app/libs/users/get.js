const User = require('../../models/user');

/**
 * Get a specific users by id
 * @memberOf module:User
 * @function get
 * @param {String} id - a valid users id
 *
 * @returns {Promise} - Returns a JSON with the specific users
 */

module.exports = id => new Promise((resolve, reject) => {
    User.find({ _id: id }, (err, users) => {
        if (err) {
            reject(err);
        } else {
            resolve(users);
        }
    });
});
