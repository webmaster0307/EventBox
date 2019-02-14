/* config-overrides.js */
/* eslint-disable */
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
const path = require('path')
const rewireTypescript = require('react-app-rewire-typescript')

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  // config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config)
  config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { legacy: true }], config)
  // config = injectBabelPlugin(['@babel/plugin-proposal-class-properties', { 'loose': true }], config)

  config = rewireTypescript(config, env)

  config = rewireLess.withLoaderOptions({
    modifyVars: {},
    javascriptEnabled: true
  })(config, env)

  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto'
  })

  config.resolve = {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@client': path.resolve(__dirname, './src'),
      '@routes': path.resolve(__dirname, './src/constants/routes.js'),
      '@gqlQueries': path.resolve(__dirname, './src/stores/apollo')
    },
    extensions: ['.js', 'jsx', '.json', 'mjs', '.ts', '.tsx']
  }

  // console.log('config: ',JSON.stringify(config))

  return config
}
