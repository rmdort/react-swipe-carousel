var path = require('path')

module.exports = {
  components: 'src/index.js',
  styleguideDir: 'docs',
  require: [
    path.join(__dirname, './src/style.css')
  ],
  showUsage: true,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js?/,
          use: ['babel-loader'],
          exclude: /node_modules/,
          include: [
            path.join(__dirname, './src')
          ]
        },
        {
          test: /(\.scss|\.css)$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader'
            }
          ]
        }
      ]
    }
  }
};