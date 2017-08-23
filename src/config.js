routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $stateProvider) {
    $stateProvider.state('root', {
        url: '/',
        onEnter: ['$state', '$log', 'UserService', ($state, $log, UserService) => {
            UserService.getUser()
                .then((data) => {
                    $log.debug(data);
                    $state.go('home');
                })
                .catch((err) => {
                    $log.error(err);
                    $state.go('login');
                });
        }],
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
}
