
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf.js')
const { getEntryPoint } = require('./entry')
const entry = getEntryPoint('index.server')
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const serverConf = merge(baseConfig, {
  entry,
  target: 'node',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({ // 不打包node_modules依赖项 whitelist 白名单
    whitelist: /\.css$/
  }),
  plugins: [
    // new VueSSRServerPlugin()
  ]
})

module.exports = serverConf