const express = require('express');
const mongoose = require('mongoose');

const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// configuration ===========================================
const db = require('./config/database');

const PORT = process.env.PORT || 3000;

mongoose.connect(db.url, { useMongoClient: true });
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// required for passport
app.use(session({
    secret: 'AhJ~M6bW%G:z,1@A"4,=$gJ]QMb`p#', // session secret
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: 'starter.connect.id',
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./app/passport')(passport);


// routes ==================================================
app.use('/', routes);

// start app ===============================================

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
