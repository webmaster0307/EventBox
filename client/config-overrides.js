/* config-overrides.js */
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
const path = require('path')

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  // config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config)
  config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { 'legacy': true }], config)
  // config = injectBabelPlugin(['@babel/plugin-proposal-class-properties', { 'loose': true }], config)
  config = rewireLess.withLoaderOptions({
    modifyVars: {},
    javascriptEnabled: true
  })(config, env)

  config.resolve = {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@client': path.resolve(__dirname, 'src/index.js'),
      '@routes': path.resolve(__dirname, 'src/constants/routes.js'),
      '@gqlQueries': path.resolve(__dirname, 'src/stores/apollo/index.js')
    }
  }

  return config
}