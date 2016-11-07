const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3090;
const cors = require('cors');
const mongoRouter = require('./routes/mongoRoutes');
const sqlRouter = require('./routes/sqlRoutes');
const passport = require('passport');
const sequelize = require('./db/sql/sqlConnect')

var pg = require('pg');
// UNCOMMENT FOR DEPLOY AND CONNECT TO HEROKU DATABASE
// pg.defaults.ssl = true;


// This will test if sequelize is connecting properly.
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  })
  
// This is for deployment when using mongo
// mongoose.connect('mongodb://<databasehere>:<passwordhere>5@dso12345.mlab.com:56789/<databasename>');

// This is for development
// mongoose.connect('mongodb://localhost:auth/auth');

app.all('/*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
   next();

});


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

// This is the router when using mongo. Feel free to change name to just router
// mongoRouter(app);
// This is the router when using sql. Feel free to change name to just router 
sqlRouter(app);

const server = http.createServer(app);

server.listen(port);
console.log("Server listening on: ", port);