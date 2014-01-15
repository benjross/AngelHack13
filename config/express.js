var express = require('express')

module.exports = function (app, config) {

	app.set('showStackError', true)
	app.use(express.compress ({
		filter: function (req,res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	//Use the default favicon
	app.use(express.favicon())
	//Setup the public serving directory
	app.use(express.static(config.root + '/assets/public'))
	//Set to use express loggers
	app.use(express.logger('dev'))
	//Set the view templating engine and the views directory
	app.set('views', config.root + '/app/views')
	app.set('view engine', 'jade')

	//Default app configurations //TODO: UNDERSTAND THESE
	app.configure(function() {
		//cookieParser
		app.use(express.cookieParser())
		//bodyParser
		app.use(express.bodyParser())
		app.use(express.methodOverride())
		//Express sessions

		//Use the router -- EXPLICITLY DEFINED AT THE END (Can be implicit -- Why?)
		app.use(app.router)
	})
}