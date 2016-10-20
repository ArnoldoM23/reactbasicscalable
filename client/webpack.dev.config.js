var path = require('path')

module.exports = {
  entry: [
  'webpack/hot/dev-server',
    //refreshes the browser when it can't hot update
    'webpack-dev-server/client?http://localhost:8080', 
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/src/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './src/index.html'
  }
};
