module.exports = {
    extends: "../.eslintrc.js",
    env: {
        node: false
    },
    globals: {
        angular: false,
        require: false,
        // Let use console but without enable browser global for now (it includes too many things).
        console: false,

    }
};
