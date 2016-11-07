const Auth = require('../controllers/sqlCtrls/authCtrl');
const passportService = require('../service/psgresPassport');
const passport = require('passport');
const jwt = require('jwt-simple');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});
const config = require('../config.js');

// TODO: Reafactor to into user model
function tokenForUser(user){
	var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

	const timestamp = parseInt(exp.getTime() / 1000);
	return jwt.encode({ id: user.user_id, iat: timestamp }, config.secret)
}

module.exports = function(app){
	
	app.get('/', requireAuth, function(req, res, next){
		res.send({message: "But it work tho"})
	});

 
	// Local sign in and sign up routes
	app.post('/signin', requireSignin, Auth.signin);
	app.post('/signup', Auth.signup)
	// ================= Facebook login =======================
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook',  {failureRedirect: 'http://localhost:3000/signin' }), 
	  function(req, res){
	  	let token = tokenForUser(req.user)
	  	// This will redirect back to home page and add the token to the url
	    res.redirect('http://localhost:3000/feature?token=' + token)
	  });
};