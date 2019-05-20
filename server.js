const path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  middleware = require('webpack-dev-middleware'),
  hotMiddleware = require('webpack-hot-middleware'),
  webpackConfig = require('./webpack.config.js'),
  app = express(),
  port = process.env.PORT || 3000;

require('dotenv').config();

let compiler = webpack(webpackConfig);

app.use(
  middleware(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath, 
    stats: { colors: true }
  })
);

app.use(hotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => { console.log(`App is listening on port ${port}`) });

app.use(express.static(path.resolve(__dirname, 'dist')));