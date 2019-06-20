
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const WriteFilePlugin = require('write-file-webpack-plugin')
// 可以把webpack生成的文件放入dist目录中

const isProd = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const baseConf = {
  mode: isProd,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'components': path.resolve(__dirname, 'components'),
      'assets': path.resolve(__dirname, 'assets')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      exclude: /(node_modules)/,
      loader: 'vue-loader'
    },{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    },{
      test: /\.css$/,
      exclude: /(node_modules)/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    },{
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        // 'css-hot-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    },{
      test: /\.(png|jpe?g|gif|svg|ico)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'dist/assets/[name].[hash].[ext]'
          }
        }
      ]
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new WriteFilePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ]
}



module.exports = baseConf