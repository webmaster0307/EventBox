const { addDecoratorsLegacy, addLessLoader } = require('customize-cra')
const path = require('path')

function webpack(config, env) {
  config = addDecoratorsLegacy()(config)
  config = addLessLoader({
    javascriptEnabled: true,
    modifyVars: {}
  })(config)
  // config = overrideEsLint(config)
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto'
  })
  config.resolve = {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@client': path.resolve(__dirname, './src/apollo'),
      '@routes': path.resolve(__dirname, './src/constants/routes.ts'),
      '@gqlQueries': path.resolve(__dirname, './src/stores/apollo'),
      '@formRules': path.resolve(__dirname, './src/constants/form_rules.ts')
    },
    extensions: ['.js', 'jsx', '.json', '.ts', '.tsx']
  }
  return config
}

// function overrideEsLint(config) {
//   config.module.rules.some((rule) => {
//     if (Array.isArray(rule.use)) {
//       /* prettier-ignore */
//       const eslintUse = rule.use.find(item =>
//         Object.keys(item.options).find(key => key === 'useEslintrc'))
//       let eslintOptions = eslintUse && eslintUse.options
//       if (eslintOptions) {
//         eslintOptions.useEslintrc = true
//         eslintOptions.ignore = true
//         return true
//       }
//     }
//   })

//   return config
// }

module.exports = { webpack }
