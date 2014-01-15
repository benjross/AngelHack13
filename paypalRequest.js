var paypal_sdk = require('paypal-rest-sdk');

paypal_sdk.configure({
  'host': 'api.sandbox.paypal.com',
  'port': '',
  'client_id': 'redacted',
  'client_secret': 'redacted'
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

var payment_details = {
  "intent": "sale",
  "payer": {
    "payment_method": "credit_card",
    "funding_instruments": [{
      "credit_card": {
        "type": "visa",
        "number": "4417119669820331",
        "expire_month": "11",
        "expire_year": "2018",
        "cvv2": "874",
        "first_name": "Joe",
        "last_name": "Shopper",
        "billing_address": {
          "line1": "52 N Main ST",
          "city": "Johnstown",
          "state": "OH",
          "postal_code": "43210",
          "country_code": "US" }}}]},
  "transactions": [{
    "amount": {
      "total": "7.47",
      "currency": "USD",
      "details": {
        "subtotal": "7.41",
        "tax": "0.03",
        "shipping": "0.03"}},
    "description": "This is the payment transaction description." }]};

paypal_sdk.payment.create(payment_details, function(error, payment){
  if(error){
    console.error(error);
  } else {
    console.log(payment);
  }
});

//var card_data = {
//  "type": "visa",
//  "number": "4417119669820331",
//  "expire_month": "11",
//  "expire_year": "2018",
//  "cvv2": "123",
//  "first_name": "Joe",
//  "last_name": "Shopper"
//};
//
//paypal_sdk.credit_card.create(card_data, function(error, credit_card){
//  if (error) {
//    console.log(error);
//    throw err;
//  } else {
//    console.log("Create Credit-Card Response");
//    console.log(credit_card);
//  }
//})
