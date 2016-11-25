// IF YOU ARE USING PGRES MAKE SURE SURE TO IMMITIADETLY INVOKE THE FUNCTION

module.exports = function() {
"use strict";
  
  var fs        = require("fs");
  var path      = require("path");
  var Sequelize = require("sequelize");
  var env       = process.env.NODE_ENV || "development";
  // var config    = require(__dirname + '/../db/config.json')[env];
  //For Heroku
  // config.port = process.env.DB_PORT || config.port;
  // config.host = process.env.DB_HOST || config.host;
  // config.username = process.env.DB_USER || config.username;
  // config.password = process.env.DB_PASSWORD || config.password;
  // config.database = process.env.DB_NAME || config.database;

  var sequelize = new Sequelize('onestop', 'young', '', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432

  });
  var db        = {};

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}() 