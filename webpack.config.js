const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/app.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'raw-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true,
                            include: path.join(__dirname, 'src'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
        hot: true,
        proxy: {
            '*': 'http://localhost:3000',
        },
    },

};
