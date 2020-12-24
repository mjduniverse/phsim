const path = require('path');

module.exports = {
    entry: [
        "./src/phSim.js",
        "./widgets-js-gen/widgetTypes.js"
    ],
    mode: "production",
    node: false,
    optimization: {
        minimize: true,
        //namedChunks: false,
        //concatenateModules: false
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "phsim.min.js",
        globalObject: 'this',
    },

    externals: {
        "matter-js": "commonjs matter-js"
    }
};