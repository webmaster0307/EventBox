/* config-overrides.js */
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less');
const path = require('path')

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
      config,
  )
  config = rewireLess.withLoaderOptions({
    modifyVars: {},
    javascriptEnabled: true,
  })(config, env)

  config.resolve = {
    alias: {
      '@components': path.resolve(__dirname, 'src/components')
    }
  }

  return config;
}