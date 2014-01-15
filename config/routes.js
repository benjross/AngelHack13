//#######__MODULE DEPENDENCIES__#########

module.exports = function(app, config) {
	var main  	= require('../app/controllers/main')
	var data 	= require('../app/controllers/data')
	var sendPayment = require('../app/controllers/sendPayment')

	app.get ('/', main.index);
	app.get ('/getAll', data.getAll);
	app.post ('/addSpace', data.addSpace);
	app.post ('/getUserListing', data.getUserListing);
	app.post ('/getFilterListing', data.getFilterListing); // filter delivered search
	app.post ('/getInitialListing', data.getInitialListing); // search based on location + date
	app.post ('/updateListing', data.updateListing);
	app.post ('/editListing', data.editListing);
	app.post ('/deleteSpace', data.deleteSpace);
	app.post ('/submitPayment', sendPayment.submitPayment);
	app.get ('/user', main.user);

//Routes here

}
