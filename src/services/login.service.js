import angular from 'angular';

factory.$inject = ['$http'];

function factory($http) {
    function login(params) {
        return $http.post('/login/', params);
    }

    function signup(params) {
        return $http.post('/signup/', params);
    }

    function logout() {
        return $http.post('/logout/');
    }

    const service = {
        login,
        logout,
        signup,
    };

    return service;
}


export default angular.module('services.login', [])
    .service('LoginService', factory)
    .name;
