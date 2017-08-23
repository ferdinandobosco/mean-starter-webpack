import angular from 'angular';

factory.$inject = ['$http'];

function factory($http) {
    function getUser() {
        return $http.get('/api/users/current');
    }
    function hasPermission(role) {
        return $http.get(`/api/users/authorized/${role}`);
    }

    const service = {
        getUser,
        hasPermission,
    };

    return service;
}


export default angular.module('services.user', [])
    .service('UserService', factory)
    .name;
