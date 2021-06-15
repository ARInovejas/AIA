module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: __dirname + '/build',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { test: /\.css$/, use: 'css-loader' },
        { test: /\.ts$/, use: 'ts-loader' },
        { test: /\.js$/, use: 'babel-loader'}
      ]
    },
    devServer: {
      contentBase: './build',
      inline: true
    }
  }