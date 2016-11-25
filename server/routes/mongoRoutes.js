const Auth = require('../controllers/mongoCtrls/authCtrl');
const passportService = require('../service/mongoPassport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

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
	  	let token = req.user.generateJWT()
	  	// This will redirect back to home page and add the token to the url
	    res.redirect('http://localhost:3000/?token=' + token)
	  });
	// ================= Github login =======================
	app.get('/auth/github',
	  passport.authenticate('github', { scope: [ 'user:email' ] }));
	app.get('/auth/github/callback', 
	  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/signin' }),
	  function(req, res) {
	    const token = req.user.generateJWT()
	    res.redirect('http://localhost:3000/?token=' + token);
	  });
};