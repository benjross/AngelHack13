// serverside
var nodemailer = require("nodemailer");
exports.fun_name = function(data_place, data_time, data_price, data_buyer, data_seller ){

	console.log("IN MAILER: "+data_seller)
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "findspacemail@gmail.com",
	        pass: "find1spacemail"
	    }
	});

	var place_name = data_place;
	var time = data_time;
	var price = data_price
	var buyer = data_buyer
	var seller = data_seller

	var buyer_txt = "Congratulations!\nYou've succesfully reserved "
		+ place_name + " on " + time + " for " + price + "!\nxoxo,\nBackyrd";
	var buyer_html = "<b>Congratulations!</b><br>You've succesfully reserved " 
		+ place_name+ " on " + time + " for " + price + "!<br>xoxo,<br>Backyrd";

	var seller_txt = "Congratulations!\n" + place_name + " has been booked on "
		+ time + "! You just made " + price + "!\nxoxo,\nBackyrd";
	var seller_html = "<b>Congratulations!</b><br>" + place_name + " has been booked on "
		+ time + "!  You just made " + price + "!<br>xoxo,<br>Backyrd";


	// setup e-mail data with unicode symbols
	var mailOptionsBuyer = {
	    from: "Space Finder✔ <findspaceplace@gmail.com>", // sender address
	    to: buyer, // list of receivers
	    subject: "Space Confirmation", // Subject line
	    text: buyer_txt, // plaintext body
	    html: buyer_html // html body
	}

	// setup e-mail data with unicode symbols
	var mailOptionsSeller = {
	    from: "Space Finder✔ <findspaceplace@gmail.com>", // sender address
	    to: seller, // list of receivers
	    subject: "Space Reserved", // Subject line
	    text: seller_txt, // plaintext body
	    html: seller_html // html body
	}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptionsBuyer, function(error, response){
	    if(error){
	        console.log(error);
	    } else {
	        console.log("Message sent: " + response.message);
	    }

	    // if you don't want to use this transport object anymore, uncomment following line
	    // smtpTransport.close(); // shut down the connection pool, no more messages
	});

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptionsSeller, function(error, response){
	    if(error){
	        console.log(error);
	    } else {
	        console.log("Message sent: " + response.message);
	    }

	    // if you don't want to use this transport object anymore, uncomment following line
	    smtpTransport.close(); // shut down the connection pool, no more messages
	});
};
