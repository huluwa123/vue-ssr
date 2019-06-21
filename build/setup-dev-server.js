
const webpack = require('webpack')
const koa2Connect = require('koa2-connect');
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackConf = require('./webpack.base.conf')
const webpackClientConf = require('./webpack.client.conf')
const webpackServerConf = require('./webpack.server.conf')
const path = require('path')
const MFS = require('memory-fs')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(webpackConf.output.path, file), 'utf-8')
  } catch (e) {
    console.log("[readFile]", e)
  }
}

module.exports = async function setupDevServer(app, cb){
  let bundle
  let clientManifest

  let ready
  const readyPromise = new Promise(r => { ready = r })
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, clientManifest)
    }
  }

  const compilerClient = webpack(webpackClientConf)
  const compilerServer = webpack(webpackServerConf)

  const devMiddleware = webpackDevMiddleware(compilerClient, {
    noInfo: true,
    publicPath: webpackConf.output.publicPath,
    stats: {
      colors: true
    }
  })

  app.use(koa2Connect(devMiddleware));
  app.use(koa2Connect(webpackHotMiddleware(compilerClient, {
    log: false,
    noInfo: true,
    quiet: true,
    heartbeat: 10 * 1000
  })));
  
  compilerClient.hooks.done.tap('done', (stats) => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  const mfs = new MFS()
  compilerServer.outputFileSystem = mfs

  compilerServer.watch({}, (err, stats) => {
    if (err) {
      reject(err)
    }
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    // bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    bundle = true
    update()
  })

  return readyPromise
}