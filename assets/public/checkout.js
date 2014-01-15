// frontend
$(document).ready(function(){
	alert('here')
	$('#checkout').click(function(e){
		e.preventDefault();
		alert("hello, world!");
		var data = {
			'cardtype'	: $('#cardtype').val(),
			'firstname'	: $('#firstname').val(),
			'lastname'	: $('#lastname').val(),
			'cardnumber': $('#cardnumber').val(),
			'csc'		: $('#csc').val(),
			'line1'		: $('#line1').val(),
			'line2'		: $('#line2').val(),
			'city'		: $('#city').val(),
			'state'		: $('#State').val(),
			'zipcode'		: $('#zipcode').val()
		};
		console.log(data)
		$.ajax({
			type	 :'POST',
			url	 :'/submitPayment',
			data	 : data,
			dataType	: 'json',
			success	 : function(data) {
				if (data.success == true)
					when.document.href="google.com"
			}
		});
	});
});

// $(document).ready(function(){
// alert('here')
// var data
// $('#checkout').click(function(e){
// e.preventDefault();
// alert("hello, world!");
// data = {
// 'space_title'	: $('#space_title').val(),
// 'space_desc'	: $('#space_desc').val(),
// 'feature_pool'	: $('#feature_pool').is(':checked'),
// 'feature_grill'	: $('#feature_grill').is(':checked'),
// 'feature_tennis'	: $('#feature_tennis').is(':checked'),
// 'feature_bar'	: $('#feature_bar').is(':checked'),
// 'feature_other'	: $('#feature_other').is(':checked'),
// 'feature_other_text' : $('#feature_other_text').val(),
// 'street_one'	: $('#street_one').val(),
// 'street_two':$('#street_two').val(),
// 'city':$('#city').val(),
// 'state':$('#state').val(),
// 'zipcode':$('#zipcode').val(),
// startDate:$('#start-date').val(),
// endDate:$('#end-date').val(),
// dates: ['99-99-9999']
// };
// // console.log(data)	
// $.ajax({
// type	 :'POST',
// url	 :'/addSpace',
// data	 : data,
// dataType : 'json',
// success	 : function(data) {
// if (data.success)
// alert('form successfully submitted')
// }
// });
// });
// });