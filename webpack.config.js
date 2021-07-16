const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'phsim.js'
  },

  optimization: {
    minimize: false,
    concatenateModules: false
  },

  mode: "production",

  externals: {
    "matter-js": "commonjs2 matter-js"
  }
  
};