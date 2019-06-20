require("@babel/register")
const Koa = require('koa')
const Router = require('koa-router')
const { routerFile } = require('./server-utils')
const { createRenderer } = require('vue-server-renderer')
const serve = require('koa-static')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const port = 8080

const app = new Koa()
const router = new Router()

app.use(serve(path.join(__dirname, '/dist')))

if(isProd === 'production'){
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  render(clientManifest)
}else{
  const setUpDevServer = require('./build/setup-dev-server')
  setUpDevServer(app, async (clientManifest) => {
    render(clientManifest)
  })
}

function render(clientManifest){
  const entryRouter = routerFile()
  entryRouter.forEach(item => {
    (function(item){
      const server = require(item.appFlile)
      router.get(`/${item.router}`, async ctx => {
        const { app, template, asyncData } = await server.default(ctx)
        
        await app.$options.methods.asyncData(app.$options.store, Object.assign({}, asyncData))
        
        const renderer = createRenderer({
          clientManifest,
          template
        })
        const html = await renderer.renderToString(app, {})
        ctx.body = html
      })
    })(item)
  })
}

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})