export default function HomeController(UserService) {
    const vm = this;

    init();

    function init() {
        UserService.getUser().then((user) => {
            vm.user = user.data;
        }).catch((err) => {
            console.log(err);
        });
    }
}

HomeController.$inject = ['UserService'];
