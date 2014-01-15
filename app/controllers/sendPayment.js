//backend 	
var paypal_sdk = require('paypal-rest-sdk');
var mailer = require('./mailer')
var db = require('./data')


exports.submitPayment = function(req, res) {
  paypal_sdk.configure({
  'host': 'api.sandbox.paypal.com',
  'port': '',
  'client_id': 'AW0vmBAUvZ4rOeglza5OZxZYOZvArH7GOCKDXgFZAvHE28wpqMtfXr1Q5uf5',
  'client_secret': 'EF-gExB2qppucKYwCjgALZVWN_jqcC0pZLHJ57ctAn-3x1FhcoesFvVedGAu'
});

var tmp;

paypal_sdk.generate_token(function(error, token){
  if(error){
    console.error(error);
  } else {
    tmp = token;
    console.log(token);
  }
});

  console.log('here')
  var data = req.body
  console.log(data)
  // console.log(req.body)
  // console.log(data)
  var payment_details = {
    "intent": "sale",
    "payer": {
      "payment_method": "credit_card",
      "funding_instruments": [{
        "credit_card": {
          "type": data.cardtype,
          "number": data.cardnumber,
          "expire_month": data.month,
          "expire_year": data.year,
          "cvv2": data.csc,
          "first_name": data.firstname,
          "last_name": data.lastname,
          "billing_address": {
            "line1": data.line1,
            "city": data.city,
            "state": data.state,
            "postal_code": data.zipcode,
            "country_code": "US" }}}]},
    "transactions": [{
      "amount": {
        "total": "7.47", // add price
        "currency": "USD",
        "details": {
          "subtotal": "7.41",
          "tax": "0.03",
          "shipping": "0.03"}},
      "description": "This is the payment transaction description." }]};

  var dataArr = db.getPayInfo(data.sid);
  console.log("IN SEND: "+dataArr);

  paypal_sdk.payment.create(payment_details, function(error, payment){
    if(error){
      console.error(error.response.details);
      res.send({'success':false})
    } else {
      console.log(payment);
      mailer.fun_name(dataArr[0],dataArr[1],dataArr[2],data.email,dataArr[3]);
      res.send({'success':true})
    }
  });
}