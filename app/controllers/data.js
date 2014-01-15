var firebase = require('firebase')
var moment = require('moment')
var fs = require('fs')

var root = new firebase('https://angelhackspace.firebaseIO.com/');
var rootVal; // This variable will always be uptodate and will be traversed for all computations

var userRef = root.child('users')
var spaceRef = root.child('spaces')
var ftRef = root.child('feats')
var revRef = root.child('reviews')

var featsCount=0, reviewsCount=0, spacesCount=0, usersCount=0

var g_username = '', g_email=''
fs.readFile('/tmp/login_creds.json', function (err, data) {
  	if(!err) {
  		var arr = data.toString().split('|')
  		g_username = arr[0];
  		g_email = arr[1];
  		console.log("IN DATA.JS: "+g_email)
  	}
});

root.on('value', function(snapshot){
	featsCount=0
	reviewsCount=0
	spacesCount=0
	usersCount=0
	rootVal = snapshot.val();
	if(rootVal){
		for(var each in rootVal.feats)
			featsCount++
		for(var each2 in rootVal.reviews)
			reviewsCount++
		for(var each3 in rootVal.spaces)
			spacesCount++
		for(var each4 in rootVal.users)
			usersCount++
	}
	// console.log('hitting base')
	// console.log(featsCount)
});

// function addNewUser(username, email) {
// 	var newCount = usersCount + 1
// 	// console.log(newCount)
// 	// spacesCount++
// 	var newUid = 'user_'+newCount.toString()
// 	var newUserRef = userRef.child(newUid)

// 	var userDetails = {
// 		email: email,
// 		username: username,
// 		phone: '123456789',
// 		uid: newUid,
// 		spaces:['space_-9']
// 	}

// }

exports.getPayInfo = function(sid){
	var arr = []
	arr.push(eval('rootVal.spaces.'+sid).title)
	arr.push(eval('rootVal.spaces.'+sid).startDate)
	arr.push(eval('rootVal.spaces.'+sid).price)
	var user_id = eval('rootVal.spaces.'+sid).uid
	arr.push(eval('rootVal.users.'+user_id).email)
	console.log("IN getPAY: "+arr)
	return arr;
}

exports.getAll = function(req, res){
	var returnObj = []
	var toPush = {}
	for (var x in rootVal.spaces) {

		var temp = (eval('rootVal.spaces.'+x))
		var featList = []
		var end=temp.features.length
		for(var i=1; i<=end; i++) {
			if(eval('rootVal.feats.feat_'+i.toString()+'.sid') == x)
				featList.push(eval('rootVal.feats.feat_'+i.toString()+'.title'))
			else
				end++
		}
		// toPush = {
		// 	'title':temp.title, 
		// 	'desc':temp.desc,
		// 	'img_url':temp.images[0],
		// 	'features':featList,
		// 	'street':temp.street,
		// 	'city':temp.city,
		// 	'state':temp.state,
		// 	'pin':temp.pin,
		// }
		if(temp.available == 'true')
			returnObj.push(temp)
	}
	res.send(returnObj);
}

exports.getUserListing = function(req, res){
	var returnObj = []
	var toPush = {}
	for (var x in rootVal.spaces) {

		var temp = (eval('rootVal.spaces.'+x))
		var featList = []
		var end=temp.features.length
		for(var i=1; i<=end; i++) {
			if(eval('rootVal.feats.feat_'+i.toString()+'.sid') == x)
				featList.push(eval('rootVal.feats.feat_'+i.toString()+'.title'))
			else
				end++
		}
		// toPush = {
		// 	'title':temp.title, 
		// 	'desc':temp.desc,
		// 	'img_url':temp.images[0],
		// 	'features':featList,
		// 	'street':temp.street,
		// 	'city':temp.city,
		// 	'state':temp.state,
		// 	'pin':temp.pin,
		// }
		if(temp.uid == req.body.uid)
			returnObj.push(temp)
	}
	res.send(returnObj);
}
exports.getUserListing_two = function(){
	var returnObj = []
	var toPush = {}
	for (var x in rootVal.spaces) {

		var temp = (eval('rootVal.spaces.'+x))
		var featList = []
		var end=temp.features.length
		for(var i=1; i<=end; i++) {
			if(eval('rootVal.feats.feat_'+i.toString()+'.sid') == x)
				featList.push(eval('rootVal.feats.feat_'+i.toString()+'.title'))
			else
				end++
		}
		// toPush = {
		// 	'title':temp.title, 
		// 	'desc':temp.desc,
		// 	'img_url':temp.images[0],
		// 	'features':featList,
		// 	'street':temp.street,
		// 	'city':temp.city,
		// 	'state':temp.state,
		// 	'pin':temp.pin,
		// }
		var x = eval('rootVal.users.'+temp.uid)
		console.log(g_email, x.email)
		if(x.email == g_email && temp.available=='true')
			returnObj.push(temp)
	}
	return returnObj;
}

exports.getFilterListing = function(req, res) {
	var returnObj = []
	var toPush = {}
	var test = ['Pool','Tennis','Basketball']
	for (var x in rootVal.spaces) {
		var temp = (eval('rootVal.spaces.'+x))
		var featList = []
		var end=temp.features.length
		for(var i=1; i<=end; i++) {
			if(eval('rootVal.feats.feat_'+i.toString()+'.sid') == x)
				featList.push(eval('rootVal.feats.feat_'+i.toString()+'.title'))
			else
				end++
		}
		// toPush = {
		// 	'title':temp.title, 
		// 	'desc':temp.desc,
		// 	'img_url':temp.images[0],
		// 	'features':featList,
		// 	'street':temp.street,
		// 	'city':temp.city,
		// 	'state':temp.state,
		// 	'pin':temp.pin,
		// }
		var exists=false
		for(var i=0; i<featList.length; i++)
			for(var j=0; j<test.length; j++)
			{
				if(featList[i]==test[j])
					exists=true
			}
		if(exists==true && temp.available == 'true')
			returnObj.push(temp)
	}
	res.send(returnObj);
}

exports.getInitialListing = function(req, res) {
	var returnObj = []
	var toPush = {}

	location = req.body.loc
	date = req.body.date

	console.log(location, date)
	for (var x in rootVal.spaces) {
		var temp = (eval('rootVal.spaces.'+x))
		var featList = []
		var end=temp.features.length
		for(var i=1; i<=end; i++) {
			if(eval('rootVal.feats.feat_'+i.toString()+'.sid') == x)
				featList.push(eval('rootVal.feats.feat_'+i.toString()+'.title'))
			else
				end++
		}
		// toPush = {
		// 	'title':temp.title, 
		// 	'desc':temp.desc,
		// 	'img_url':temp.images[0],
		// 	'features':featList,
		// 	'street':temp.street,
		// 	'city':temp.city,
		// 	'state':temp.state,
		// 	'pin':temp.pin,
		// }
		// var cont=true
		var startdateval = eval('rootVal.spaces.'+x).startDate,//new Date(eval('rootVal.spaces.'+x).startDate),
			currdate = date//Date(date)
			console.log((eval('rootVal.spaces.'+x).city + ', ' + eval('rootVal.spaces.'+x).state), location)
		if(startdateval == currdate && 
			(eval('rootVal.spaces.'+x).city + ', ' + eval('rootVal.spaces.'+x).state) == location &&
			temp.available == 'true'){
				returnObj.push(temp)
		}
	}
	res.send(returnObj);
}

exports.updateListing = function(req, res) {
	var ref = spaceRef.child(req.body.sid)
	var temp = eval('rootVal.spaces.'+req.body.sid)
	temp.available = 'false'
	ref.set(temp)
}

exports.editListing = function(req, res) {
	var ref = spaceRef.child(req.body.sid)
	var temp = eval('rootVal.spaces.'+req.body.sid)
	res.send(temp)
}

exports.deleteSpace = function(req,res) {
	var sid = req.body.sid;
	var temp = eval('rootVal.spaces.'+sid)
	temp.available = 'false'
	var spaceRefNew = spaceRef.child(sid)
	spaceRefNew.set(temp)
	// eval('rootVal.spaces.'+sid).available = 'false'	
	// // console.log("SID:")
	// console.log(sid)
	// var spaceRemoveRef = spaceRef.child(sid)
	// var uid = eval('rootVal.spaces.'+sid).uid
	// var uidContent = eval('rootVal.users.'+uid)
	// var userSpaces = uidContent.spaces
	// console.log("USERSPACES:");
	// console.log(userSpaces);
	// var spaces = []
	// for (var i=0; i<userSpaces.length; i++)
	// 	// console.log(userSpaces[i])
	// 	if(userSpaces[i]!=sid)
	// 		spaces.push(userSpaces[i])

	// console.log("SPACES:");
	// console.log(spaces);
	// uidContent.spaces = spaces

	// var newUserRef = userRef.child(uid)
	// newUserRef.set(uidContent)

	// for(var j=0; j<eval('rootVal.spaces.'+sid).features.length; j++)
	// {
	// 	var feature = eval('rootVal.spaces.'+sid).features[j];
	// 	var fCount = featsCount;
	// 	for(var k=1; k<=fCount; k++)
	// 	{
	// 		if(eval('rootVal.feats.feat_'+k).title == feature)
	// 		{
	// 			var fID = 'feat_'+k.toString()
	// 			var fRef = ftRef.child(fID)
	// 			fRef.remove()

	// 		}
	// 	}
	// }

	// spaceRemovalRef.remove()
	res.send({'success':true})
}

exports.addSpace = function(req, res){


	// console.log(req.body);
	var newCount = spacesCount + 1
	// console.log(newCount)
	// spacesCount++
	var newSid = 'space_'+newCount.toString()
	var newSpaceRef = spaceRef.child(newSid)

	var userID;
	var newUserBool = true
	for(each in rootVal.users)
		console.log(req)
		if ((eval('rootVal.users.'+each)).username == g_username)
		{
			newUserBool = false
			userID = eval('rootVal.users.'+each).uid
		}


	if(newUserBool == true)
	{
		var newUserCount = usersCount + 1
		var newUid = 'user_'+newUserCount.toString()
		var newUserRef = userRef.child(newUid)
		userID = newUid
		addDetails = {
			username: g_username,
			email: g_email,
			spaces:[newSid],
			paypalid:g_email,
			uid:newUid,
			phone:'123456789',
		}
		newUserRef.set(addDetails)
	} else {
		var newUserRef = userRef.child(userID)
		var currUserDetails = eval('rootVal.users.'+userID)
		currUserDetails.spaces.push(newSid)
		newUserRef.set(currUserDetails)	
	}

	var featList = []
	if (req.body.feature_pool == 'true')
		featList.push('Pool')
	if (req.body.feature_grill == 'true')
		featList.push('Grill')
	if (req.body.feature_tennis == 'true')
		featList.push('Tennis')
	if (req.body.feature_bar == 'true')
		featList.push('Bar')
	if (req.body.feature_fire_pit == 'true')
		featList.push('Fire pit')
	if (req.body.feature_porch == 'true')
		featList.push('Porch')
	if (req.body.feature_other == 'true')
		featList.push(req.body.feature_other_text)
	var space_details = {
		'title':req.body.space_title,
		'desc':req.body.space_desc,
		'sid':newSid,
		'uid':userID,
		'street':req.body.street_one,
		'city':req.body.city,
		'state':req.body.state,
		'pin':req.body.zipcode,
		'images':req.body.image_url,
		'price':req.body.price,
		'features':featList,
		'reviews':['rev_1','rev_2'],
		'startDate':req.body.startDate,
		'available':'true'
	}
	newSpaceRef.set(space_details)


	
	// console.log('logging featsCount')
	// console.log(featsCount)
	for(var i=0; i<featList.length; i++) {
		var newCount = featsCount + 1
		// console.log('logging featsCount')
		// console.log(featsCount)
		var newFid = 'feat_'+newCount.toString()
		// console.log(newFid)
		var newFeatRef = ftRef.child(newFid)
		var tempDetails = {
			fid: newFid,
			sid:newSid,
			uid:space_details.uid,
			title:featList[i]
		}
		// console.log(tempDetails)
		newFeatRef.set(tempDetails)
	}
	res.send({'success':true});
}


