
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { getEntryPoint } = require('./entry')
const entryObj = getEntryPoint('index')
let entry = null

if(baseWebpackConfig.mode === 'production'){
  entry = entryObj
}else{
  entry = Object.keys(entryObj).reduce((obj, cur) => {
    const hmr = `webpack-hot-middleware/client?name=${cur}&reload=true&timeout=20000`;
    obj[cur] = []
    obj[cur].push(entryObj[cur], hmr)
    return obj
  }, {})
  // 小记：hmr文件 必须和入口文件放在一起哦！
}

const clientConf = merge(baseWebpackConfig, {
  entry,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      name: 'manifest'
    }
  },
  devtool: 'source-map',
  plugins: [
    new VueSSRClientPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = clientConf