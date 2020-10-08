const path = require('path');

module.exports = {
    entry: "./src/phSim.js",
    mode: "none",
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
    }
};