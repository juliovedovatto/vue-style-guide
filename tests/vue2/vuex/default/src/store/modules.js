const moduleFiles = require.context('./modules/', false, /.+\.js$/i)
const moduleNames = moduleFiles.keys().map(k => k.replace(/^\.\/(.+)\.js$/, '$1'))
const modules = moduleFiles.keys().map(k => moduleFiles(k).default)

export default moduleNames.reduce((result, current, index) => {
  return (result[current] = modules[index]), result
}, {})
