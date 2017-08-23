const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

module.exports = ((passport) => {
// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the users for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

// used to deserialize the users
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with username
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
        (req, username, password, done) => {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(() => {
                console.log(req.body);
                // we are checking to see if the users trying to login already exists
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }

                    // check to see if theres already a users with that username
                    if (user) {
                        console.log('aaaa');
                        console.log(user);
                        return done(null, false, { message: 'That username is already taken.' });
                    }
                    // if there is no users with that username
                    // create the users
                    const newUser = new User();
                    console.log('ccccc');
                    console.log(newUser);
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);
                    newUser.email = req.body.email;
                    console.log(newUser);
                    return newUser.save((errNewUser) => {
                        if (errNewUser) {
                            throw errNewUser;
                        }
                        return done(null, newUser);
                    });
                });
            });
        }));

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
        (req, username, password, done) => {
            // we are checking to see if the users trying to login already exists
            User.findOne({ username }).exec((err, user) => {
                // if there are any errors, return the error before anything else
                if (err) {
                    return done(err);
                }

                // if no users is found, return the message
                if (!user) {
                    return done(null, false, { message: 'No users found.' });
                }

                // if the users is found but the password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Oops! Wrong password.' });
                }

                // all is well, return successful users
                return done(null, user);
            });
        }));
});
