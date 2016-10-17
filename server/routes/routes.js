module.exports = function(app){
	app.get('/', function(req, res, next){
		res.send("But it work tho")
	});

	app.post('/posting', function(req, res, next){
		res.send("we posted on the block");
	});
};