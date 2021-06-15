module.exports = {
    mode: 'development',
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
      port: (process.env.port || 80),
      host: '0.0.0.0',
      contentBase: './build',
      inline: true
    }
  }