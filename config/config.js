var path 		= require('path'),
	rootPath	= path.normalize(__dirname + '/..');

module.exports = {

	//SETUP ENVIRONMENTS FOR TESTING, STAGING AND PRODUCION
	development: {
		root 	: rootPath,
		app		: {
			name	: 'Angelhack'
		},
	},
	production: {
		//Implement Later
	}
}