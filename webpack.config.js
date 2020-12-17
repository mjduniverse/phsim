const path = require('path');

module.exports = {
    entry: [
        "./src/phSim.js",
        "./widgets-js-gen/widgetTypes.js"
    ],
    mode: "production",
    node: false,
    optimization: {
        minimize: false,
        //namedChunks: false,
        //concatenateModules: false
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "phSim.js",
        globalObject: 'this',
    },

    externals: {
        "matter-js": "commonjs matter-js"
    }
};