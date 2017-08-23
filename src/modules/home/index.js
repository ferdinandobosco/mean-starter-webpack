import angular from 'angular';
import uirouter from 'angular-ui-router';
import './home.scss';

import routing from './home.routes';
import HomeController from './home.controller';
import UserService from '../../services/user.service';

export default angular.module('app.home', [uirouter, UserService])
    .config(routing)
    .controller('HomeController', HomeController)
    .name;
