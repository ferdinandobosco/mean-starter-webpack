import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';

import 'angular-material/angular-material.css';
import './css/styles.scss';

import routing from './config';
import home from './modules/home';
import nav from './directives/nav';
import login from './modules/login';

const items = [{ name: 'home', state: 'home', icon: 'home' }, { name: 'admin', state: '', icon: 'person' }];

angular.module('app', [uirouter, ngMaterial, ngAria, ngAnimate, nav, home, login])
    .config(routing)
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-green')
            .accentPalette('red', {
                default: '600',
            })
            .warnPalette('orange')
            .backgroundPalette('grey');
    })
    .constant({ navItems: items })
    .run(['$rootScope', '$state', 'UserService', ($rootScope, $state, UserService) => {
        $rootScope.$on('$stateChangeStart',
            (event, toState) => {
                UserService.getUser()
                    .then(() => {
                        if (toState.name === 'login') { $state.go('home'); } else { $state.go(toState.name); }
                    })
                    .catch(() => {
                        $state.go('login');
                    });
            });
    }]);
