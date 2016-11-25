const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const models = require('./db/sql/models');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3090;
const cors = require('cors');
const mongoRouter = require('./routes/mongoRoutes');
const sqlRouter = require('./routes/sqlRoutes');
const passport = require('passport');


var pg = require('pg');
// UNCOMMENT FOR DEPLOY AND CONNECT TO HEROKU DATABASE
// pg.defaults.ssl = true;


// This will test if sequelize is connecting properly.

  
// This is for deployment when using mongo
// mongoose.connect('mongodb://<databasehere>:<passwordhere>5@dso12345.mlab.com:56789/<databasename>');

// This is for development
mongoose.connect('mongodb://localhost:auth/auth');

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


// Use this if using mongo
// app.listen(PORT, () => console.log('listening on port', PORT));

// Use this if using SQL
models.sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log('listening on port', PORT));
});

