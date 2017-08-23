export default function NavController($state, navItems, UserService, LoginService) {
    const vm = this;

    init();

    function init() {
        vm.items = navItems;
        vm.go = go;
        vm.logout = logout;
        vm.currentState = $state.current.name;

        UserService.getUser()
            .then((data) => {
                vm.user = data.data;
            })
            .catch(() => {
                vm.user = null;
            });
    }

    function logout() {
        LoginService.logout()
            .then(() => {
                $state.go('login');
            })
            .catch((err) => {
                console.log(err);
                // AlertService.addError(err.data.message);
            });
    }

    function go(state) {
        $state.go(state);
    }
}

NavController.$inject = ['$state', 'navItems', 'UserService', 'LoginService'];
