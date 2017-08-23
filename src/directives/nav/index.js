import angular from 'angular';
import NavController from './nav.controller';
import UserService from '../../services/user.service';
import LoginService from '../../services/login.service';

function myNav() {
    return {
        restrict: 'E',
        scope: {
            items: '=',
        },
        template: require('./nav.html'),
        controller: NavController,
        controllerAs: 'navCtrl',
    };
}

export default angular.module('directives.nav', [UserService, LoginService])
    .directive('myNav', myNav)
    .name;
