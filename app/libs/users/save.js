const User = require('../../models/user');

/**
 * Save an User object.
 * @memberOf module:User
 * @function save
 * @param {Object} params - User params
 *
 * @returns {Promise} - Returns a JSON with the saved users
 */

module.exports = (params) => {
    const userData = new User(params);

    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: userData._id },
            userData,
            { upsert: true, new: false },
            (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
    });
};
