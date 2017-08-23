const passport = require('passport');

module.exports = (req, res) => {
    passport.authenticate('local-signup', (error, user, message) => {
        if (!user) { return res.status(403).json(message); }
        if (error) { return res.status(500).json(error); }
        const userObject = user.toObject();
        delete userObject.password;
        req.session.user = userObject;
        req.session.save();
        return res.status(200).json('Registration successful');
    })(req, res);
};
