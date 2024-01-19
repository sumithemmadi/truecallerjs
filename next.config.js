const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  basePath: '/truecallerjs',
})

module.exports = withNextra()
