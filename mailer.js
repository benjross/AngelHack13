// serverside
var nodemailer = require("nodemailer");
exports.fun_name = function(){
	
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "findspacemail@gmail.com",
	        pass: "find1spacemail"
	    }
	});
	
	var place_name = "poop town";
	var time = "7/28";
	
	
	var txt = "Congratulations!\nYou've succesfully reserved" + place_name+ "for" + time + "!\nxoxo,\nBackyrd";
	var html = "<b>Congratulations!</b><br>You've succesfully reserved " + place_name+ " for " + time + "!<br>xoxo,<br>Backyrd";
	
	
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: "Space Finder✔ <findspaceplace@gmail.com>", // sender address
	    to: "test@test.com", // list of receivers
	    subject: "Space Confirmation", // Subject line
	    text: txt, // plaintext body
	    html: html // html body
	}
	
	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    } else {
	        console.log("Message sent: " + response.message);
	    }
	
	    // if you don't want to use this transport object anymore, uncomment following line
	    smtpTransport.close(); // shut down the connection pool, no more messages
	});
};
