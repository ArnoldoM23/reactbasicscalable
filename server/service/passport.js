const passport = require('passport');
const config = require('../config');
const User = require('../db/mongodb');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local');


const localOptions = { usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	User.findOne({email: email}, function(err, user){
		if (err) { return done(err); }
		if (!user) { return done(null, false); }

		user.comparePassword(password, function(err, match){
			if (err) { return done(err); }
			if (!match) { return done(null, false); }
			return done(null, user) 
		});
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	User.findById(payload.sub, function(err, user){
		if (err) { return done(errr);}

		return user ? done(null, user) : done(null, false)
	});
});


passport.use(localLogin);
passport.use(jwtLogin);