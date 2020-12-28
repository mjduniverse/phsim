const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'phsim.min.js'
  },

  optimization: {
    minimize: true,
    concatenateModules: false
  },

  mode: "production"
  
};