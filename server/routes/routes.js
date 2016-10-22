const Auth = require('../controllers/auth');
const passportService = require('../service/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
	// use require auth as the second argument in the request to protect/authenticate the route.

	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at
	//     /auth/facebook/callback
	router.get('/auth/facebook', passport.authenticate('facebook'));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', {failureRedirect: '/login' }), 
	  function(req, res){
	    res.json( { token: req.user.generateJWT() } )
	    // res.redirect('/')
	  });

	app.get('/', requireAuth, function(req, res, next){
		res.send({message: "But it work tho"})
	});


	// local sign in and sign up routes
	app.post('/signin', requireSignin, Auth.signin);
	app.post('/signup', function(req, res, next){
		res.send({singin: "email: "+req.body.email + " passw: " + req.body.password })
	})
};