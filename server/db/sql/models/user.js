const Sequelize = require('sequelize');
const sequelize = require('../sqlConnect');


const Users = sequelize.define('users', {
	user_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  facebook_id: { defaultValue: null, type: Sequelize.STRING },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {timestamps: false});


// This creates the table.
Users.sync({force: false})
	.then(() =>{
		console.log("Users table was created")
	});

module.exports = Users;