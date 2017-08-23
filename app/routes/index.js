const routes = require('express').Router();
const users = require('./users');
const auth = require('./auth');

const prefix = '/api';

routes.use(`${prefix}/users`, users);
routes.use('/', auth);

routes.get('*', (req, res) => {
    res.sendfile('./public/index.html');
});

module.exports = routes;
