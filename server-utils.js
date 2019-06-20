const glob = require('glob')
const path = require('path')

function routerFile(){
  const file = path.resolve(__dirname, `pages/*`)
  const entryObject = glob.sync(file).reduce((entries, entry) => {
    let basename = path.basename(entry)
    const appFlile = `./dist/${basename}-server-bundle.js`
    if(basename.indexOf('.')){
      basename = basename.replace(/\./g, '/')
    }
    entries.push({
      router: basename,
      appFlile
    })
    return entries;
  }, [])
  return entryObject
}

module.exports = {
  routerFile
}