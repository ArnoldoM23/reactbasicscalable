const Auth = require('../controllers/auth');
const passportService = require('../service/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
	app.get('/', requireAuth, function(req, res, next){
		res.send({message: "But it work tho"})
	});

	app.post('/signin', requireSignin, Auth.signin);
	app.post('/signup', function(req, res, next){
		res.send({singin: "email: "+req.body.email + " passw: " + req.body.password })
	})
};