const glob = require('glob')
const path = require('path')

const getEntryPoint = function(fileName){
  const file = path.resolve(__dirname, `../pages/*`)
  const entryObject = glob.sync(file).reduce((entries, entry) => {
    const basename = path.basename(entry)
    entries[basename] = `${entry}/${fileName}.js`
    return entries;
  }, {})
  return entryObject
}
module.exports = {
  getEntryPoint
}