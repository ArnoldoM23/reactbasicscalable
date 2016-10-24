const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
var path = require('path');


var publicPath = path.resolve(__dirname, 'src');
app.all('/*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
   next();

});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(publicPath));

app.get('*', (req,res) =>{
	res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

const server = http.createServer(app);

server.listen(port);
console.log("Server listening on: ", port);