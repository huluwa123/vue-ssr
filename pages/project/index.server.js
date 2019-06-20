
import createApp from '.'

function App(ctx){
  const template = `<!DOCTYPE html>
  <html>
    <head>
    {{{ renderStyles() }}}
    </head>
    <body>
      <!--vue-ssr-outlet-->
    </body>
  </html>`
  return {
    app: createApp(),
    template
  }
}

export default App