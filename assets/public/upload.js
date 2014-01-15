$(document).ready(function(){
	// alert('here')
	var data
	// $('.checkout').click(function(e){
	// 	e.preventDefault();
	// 	// alert("hello, world!");
	// 	data = {
	// 		'space_title'	: $('#space_title').val(),
	// 		'space_desc'	: $('#space_desc').val(),
	// 		'feature_pool'	: $('#feature_pool').is(':checked'),
	// 		'feature_grill'	: $('#feature_grill').is(':checked'),
	// 		'feature_tennis'	: $('#feature_tennis').is(':checked'),
	// 		'feature_bar'	: $('#feature_bar').is(':checked'),
	// 		'feature_porch' : $('#feature_porch').is(':checked'),
	// 		'feature_fire_pit' : $('#feature_fire_pit').is(':checked'),
	// 		'feature_other'	: $('#feature_other').is(':checked'),
	// 		'feature_other_text' : $('#feature_other_text').val(),
	// 		'street_one'	: $('#street_one').val(),
	// 		'street_two':$('#street_two').val(),
	// 		'city':$('#city').val(),
	// 		'state':$('#state').val(),
	// 		'zipcode':$('#zipcode').val(),
	// 		startDate:$('#start-date').val(),
	// 		endDate:$('#end-date').val(),
	// 		dates: ['99-99-9999'],
	// 		image_url: $('#space_image').val(),
	// 		price: $('#price').val()
	// 	};
	// 	console.log(data)
	// 	$.ajax({
	// 		type	 :'POST',
	// 		url	 	 :'/addSpace',
	// 		data	 : data,
	// 		dataType : 'json',
	// 		success	 : function(data) {
	// 			if (data.success)
	// 				alert('form successfully submitted')
	// 		}
	// 	});
	// });

	$('#filepicker_button').click(function(){
				console.log('here');
				filepicker.setKey('AKuopPE6CTw0vqFI3RA7Az');
				filepicker.pickAndStore({mimetype:"image/*"}, {location:"S3"}, function(fpfiles){
			   		// alert(JSON.stringify(fpfiles));
			   		console.log(fpfiles[0].url);
			   		$('#filepicker_button').css("backgroundImage",'url('+fpfiles[0].url+')')
				});	
			});
});