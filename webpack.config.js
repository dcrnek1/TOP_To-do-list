const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Name of the bundled file
        clean: true,
    },
    mode: 'development', // Development mode configuration
    module: {
        rules: [
            {
                test: /\.css$/, // Apply loader only for .css files
                use: ['style-loader', 'css-loader'] // Use both loaders: style-loader and css-loader
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Path to your HTML template file
            title: 'To do App',
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Serve content from the 'dist' directory
        },
        compress: true, // Enable gzip compression for everything served
        port: 8080, // Specify port number
        hot: true, // Enable Hot Module Replacement (HMR)
        watchFiles: './src'
    }
};