const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
var path = require('path');


var publicPath = path.resolve(__dirname, 'src');


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.get('*', (req,res) =>{
	res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

const server = http.createServer(app);

server.listen(port);
console.log("Server listening on: ", port);