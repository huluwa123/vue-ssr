
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
    app: createApp(),
    template,
    asyncData: {}
  }
}

export default App