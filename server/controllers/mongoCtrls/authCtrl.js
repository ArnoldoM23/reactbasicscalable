const jwt = require('jwt-simple');
const config = require('../../config');
const User = require('../../db/mongo/models/user.js');


// SING IN ==============================
exports.signin = function(req, res, next){
	res.send({ token: req.user.generateJWT() });
}


// SING UP ==============================
exports.signup = function(req, res, next){
	const email = req.body.email;
	const password = req.body.password;
	
	// See if a user wiht a given email exists
	if (!email || !password ) {
		return res.status(422).json({ error: "You must provide email and password "})
	}
	User.findOne({email: email }, function(err, existingUser){
			if (err) { return next(err); }
	// if user does exist, return and error
			if (existingUser) {
				res.status(422).json({ error: 'Email is in use'}); 
			}
	// if user wiht email does not exsit, create and save user record
			const user = new User({
				email: email,
				password: password
			});

			user.save(function(err){
				if (err) { return next(err)}
				res.json({token: user.generateJWT() })
			});
	// Responce to request indicating the user was created
	});
}