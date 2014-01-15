exports.index = function (req, res) {
	res.render('index')
}

exports.user = function (req, res) {
	var db = require('./data')
	var arr = db.getUserListing_two()
	console.log(arr)
	res.render('user',{data: arr,username:'pratham'})
}

exports.submit = function (req, res) {
	res.send({success:true})
}
