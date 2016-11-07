const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const User = require('../db/sql/models/user.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local');


const localOptions = { usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions, function(email, password, done){

  User.findOne( { where: { email: email } } )
    .then(user => {

      bcrypt.compare(password, user.dataValues.password, function(err, match){
        if(err){ return done(err); }
        if (!match) { return done(null, false); }
        done(null, user);
      });
    })
    .catch(err => done(err) );
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	// find a user in the database by id.
	User.findOne( { where: {user_id: payload.id} } )
    .then(user => {
  		return user ? done(null, user) : done(null, false);
  	})
    .catch(err => done(err));
});

const facebookLogin = new FacebookStrategy({
    // 'ENTER_CLIENT_ID'
    clientID: 'ENTER_CLIENT_ID',
    //  'ENTER_CLIENT_SECRET'
    clientSecret: 'ENTER_CLIENT_SECRET',
    // Make sure that the name you give your callback matches the callback on the server.
    callbackURL: "http://localhost:3090/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function(){
      // look for user in the database.
      User.findOne( { where: {facebook_id: profile.id} })
        .then(user => {
          if (user) {
            return cb(null, user)
          } else{
            User.create({ facebook_id: profile.id, name: profile.displayName, email: profile.displayName.split(' ')[0] })
                .then(user =>  { cb(null, user) })
                .catch(err => cb(err));
          }
        })
        .catch(err => cb(err));
    });
});

passport.serializeUser(function(user, cb) {
  console.log('serializeUser',user);
  cb(null, user);
});
// deserialize the data
passport.deserializeUser(function(user, cb) {
  console.log('deserializeUser',user);
  cb(null, user);
});


passport.use(localLogin);
passport.use(jwtLogin);
passport.use(facebookLogin)