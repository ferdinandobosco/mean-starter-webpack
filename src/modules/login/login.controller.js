export default function LoginController($location, $state, LoginService) {
    const vm = this;

    activate();

    function activate() {
        vm.formData = {};
        vm.login = login;
        vm.signup = signup;
        vm.go = go;
        vm.changeTab = changeTab;
        vm.imagePath = '/images/logo.png';
        vm.isLogin = true;
    }

    function go(url) {
        $location.path(url);
    }

    function login() {
        LoginService.login(vm.formData)
            .then((data) => {
                console.log(data);
                $state.go('home');
            })
            .catch((data) => {
                console.log(data);
                // AlertService.addError(data.data.message);
            });
    }

    function signup() {
        LoginService.signup(vm.formData)
            .then(() => {
                $state.go('home');
            })
            .catch((data) => {
                console.log(data);
                // AlertService.addError(data.data.message);
            });
    }

    function changeTab() {
        vm.isLogin = !vm.isLogin;
    }
}

LoginController.$inject = ['$location', '$state', 'LoginService'];

