const path = require('path');

var o = [

    {
        entry: "./src/phSim.js",
        mode: "production",
        node: false,
        optimization: {
            minimize: false,
        },
    
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: "phsim.js",
            globalObject: 'this',
        },
    
        externals: {
            "matter-js": "commonjs matter-js"
        }
    },

    {
        entry: "./src/phSim.js",
        mode: "production",
        node: false,
        optimization: {
            minimize: true,
        },
    
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: "phsim.min.js",
            globalObject: 'this',
        },
    
        externals: {
            "matter-js": "commonjs matter-js"
        }
    }
];

module.exports = o;