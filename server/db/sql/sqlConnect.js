const Sequelize = require('sequelize');
// Enter database info
const sequelize = new Sequelize('database', 'username', 'password',  {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432

});

module.exports = sequelize;