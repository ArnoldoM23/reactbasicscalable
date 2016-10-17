const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3090;
const cors = require('cors');
const router = require('./routes/routes');

app.use(morgan('combined'));
app.use(bodyParser.json());
// app.use(cors());
router(app);



const server = http.createServer(app);

server.listen(port);
console.log("Server listening on: ", port);