
import createApp from '.'

function App(ctx){
  const template = `<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <!--vue-ssr-outlet-->
    </body>
  </html>`
  return {
    template,
    app: createApp(),
    asyncData: {}
  }
}

export default App