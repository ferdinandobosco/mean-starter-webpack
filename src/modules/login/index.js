import angular from 'angular';
import uirouter from 'angular-ui-router';
import './login.scss';

import routing from './login.routes';
import LoginController from './login.controller';
import LoginService from '../../services/login.service';

export default angular.module('app.login', [uirouter, LoginService])
    .config(routing)
    .controller('LoginController', LoginController)
    .name;
