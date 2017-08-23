const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
});

// generating a hash
userSchema.methods.generateHash = function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function validPassword(password) {
    console.log(password);
    console.log('PASS');
    console.log(this.password);
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
