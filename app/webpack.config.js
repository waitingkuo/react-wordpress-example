module.exports = {
  entry: './src/bundle.jsx',
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader'},
    ]

  }
}
