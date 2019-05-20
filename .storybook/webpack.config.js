const path = require('path')

// Loading CSS and CSS Modules for Storybook is kind of a pain - more here
// See https://github.com/storybooks/storybook/issues/5941#issuecomment-471174523
// See https://stackoverflow.com/questions/55119427/can-i-use-css-modules-with-storybook-5-react-flavour
// See https://github.com/webpack-contrib/css-loader/issues/295#issuecomment-490455440

module.exports = ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'

  config.module.rules = config.module.rules.filter(
    rule => rule.test.toString() !== '/\\.css$/'
  )

  // CSS Module support
  config.module.rules.push(
    {
      test: /\.(css)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            importLoaders: 2,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        },
      ],
      include: path.resolve(__dirname, '../')
    },
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
        },
      // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    }
  )
  config.resolve.extensions.push('.ts', '.tsx');
  return config
}