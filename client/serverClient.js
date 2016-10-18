const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
var path = require('path');
const config = require('./webpack.pro.config')
const webpack = require('webpack');

var publicPath = path.resolve(__dirname, 'client');

const compiler = webpack(config);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

const server = http.createServer(app);

server.listen(port);
console.log("Server listening on: ", port);