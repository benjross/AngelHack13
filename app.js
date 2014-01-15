//*********__MODULE DEPENDENCIES__**************
var express		= require('express'),
	filesystem	= require('fs'),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	dataFunctions = require('./app/controllers/data')
var fs = require('fs');

var FACEBOOK_APP_ID = "460675210689344"
var FACEBOOK_APP_SECRET = "97d194e36d50d710deb364b76a8078f5";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    console.log('here')

    fs.writeFile("/tmp/user_profile", profile, function(err) {
        if(err) {
            console.log(err);
            done(null, profile)
        } else {
            console.log(profile);
            // dataFunctions.addNewUser(profile.username, profile.email)
            done(null, profile)
        }
    });
  }
));

//*********__CONFIGURATIONS__******************
var env 		= process.env.NODE_ENV || 'development',
	config 		= require('./config/config')['development']

//*********__BOOTSTRAPPERS__*******************
//-//__Bootstrap all the respective models
// var models_path = __dirname + '/app/models'
// filesystem.readdirSync(models_path).forEach(function (file) {
// 	require(models_path+'/'+file)
// })
//-//__Express Stuff
var app = express();
app.use(passport.initialize());
app.use(passport.session());
require('./config/express')(app, config)
app.get('/auth/facebook',passport.authenticate('facebook'), function(req,res){});
app.get('/auth/facebook/callback', passport.authenticate('facebook',{ scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), function(req, res){
	res.redirect('/close');
	console.log(req.user.username);
	fs.writeFile("/tmp/fb_login", {'success':true}, function(err) {
        if(err) {
            console.log(err);
        }
    });
    fs.writeFile("/tmp/login_creds.json", req.user.username+'|'+req.user.emails[0].value, function(err) {
        if(err) {
            console.log(err);
        }
    });
});
require('./config/routes')(app, config)
app.get('/auth/isloggedin', function(req, res){
	fs.readFile('/tmp/fb_login', function (err, data) {
	  	if (err) {
	  		res.send({'success':false})
	  	} else {
			fs.unlink('/tmp/fb_login', function (err) {});
	  		res.send({'success':true})
	  	}
	});
});

app.get('/close', function(req,res){
	res.render('close')
})

//-//__Router Config

var port = process.env.PORT || 3000
app.listen(port)
console.log('listening on port '+port)

//EXPOSE APPLICATION <--- What does this mean?
exports = module.exports = app