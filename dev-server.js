const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config.dev')

const app = express()
const compiler = webpack(config)
const PORT = 4444

app.use(express.static('assets'))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, (error) => {
  if (error) {
    return console.error(error)
  }
  console.log(`Hello, I\'m the Connector Factory! Running at http://localhost:${PORT}`)
})
