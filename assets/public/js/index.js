function parallaxScroll() {
	var scrolled = $(window).scrollTop();
	$('body').css('backgroundPosition', '0px '+(scrolled*-0.25)+'px');
}

var sid = ''
function stagger(pass) {
	var data = pass[0]
	var i = pass[1]
	console.log(data[i]);
	$('article.space .picture').eq(i).css('backgroundImage', 'url('+data[i].images+')')
	$('article.space .container .title').eq(i).html(data[i].title)
	$('article.space .container .description').eq(i).html(data[i].desc)
	$('article.space .container span.cta').eq(i).html('$'+data[i].price)
	$('article.space .container .location').eq(i).html(data[i].street+', ' + data[i].city + ', ' + data[i].state)
	for (var j=0; j<data[i].features.length; j++) {
		addFeature(data[i].features[j],i);
	}

	$('article.space .container button.cta.rent').eq(i).attr('sid',data[i].sid)
}

function addFeature(featureName,i) {
	var feature = '<li class=\'feature\'>' + featureName + '</li>'
	$('article.space .container .features').eq(i).append(feature)
}
var article = '<article class="space" style="opacity: 1; top: 0px;"><div class="picture-container"><div class="picture"></div></div><div class="container"><span class="title"></span><span class="location"></span><span class="cta"></span><button class="cta rent">Rent!</button><hr><p class="description"></p><ul class="features"></ul></div></article>'

function perfTest(callback) {
	$.ajax({
		type	 :'GET',
		url	 	 :'/auth/isloggedin',
		dataType : 'json',
		success  : function(data) {callback(data);}
	});
}



$(document).ready(function(){
	// $('form').jqTransform({imgPath:'jqtransformplugin/img/'});

	$('.picture').each(function(o,i){
		console.log('working it');
		console.log($(this).attr('img'));
		$(this).css('background','url('+$(this).attr('img')+')');
	})

	$('.find').click(function(){
		$('.loaders.icon').css('opacity','1');
		if ($('.titler').val() == 'looking for') {
			var height = $('section.landing-header').height();
			$('section.landing-header').css('marginTop','-'+height+'px');
			$('section.spaces.avail').css('opacity',1);
			$('section.spaces.avail').css('display','block');
			var data = {
				loc : $('#loc').val(),
				date : $('#date').val()
			}
			$.ajax({
				type	 :'POST',
				url	 	 :'/getInitialListing',
				data	 : data,
				dataType : 'json',
				success  : function(data){
					console.log(data)
					var pass = []
					for(var i=0; i<data.length; i++) {
						$('article.space').eq(i).css('top','-100px');
						pass = [data,i]
						$('section.spaces.page.avail').append(article);
						setTimeout(stagger,0,pass);

					}
					for(var i=0; i<data.length; i++) {
						setTimeout(function(){
							$('article.space').eq(i).css('opacity','1');
							$('article.space').eq(i).css('top','0px');
							$('.loaders.icon').css('opacity','0');
						},2000+100*(i+1));
					}
				}
			});
		}
		else {
			window.open("/auth/facebook", "Facebook auth", "location=no,width=320,height=200");
			var interval = window.setInterval(function(){
				var booleanV = perfTest(function(data){
					var me = this
					if (data.success==true) {
						window.clearInterval(interval);
						var height = $('section.landing-header').height();
						$('section.landing-header').css('marginTop','-'+height+'px');
						$('section.spaces.listing').css('opacity',1);
						$('section.spaces.listing').css('display','block');
					}
				})
			},100)
		}
	});
	$(window).scroll(function(){
		parallaxScroll();
	});

	$('label.c input').click(function(){
		if($('#filter-button').is(":checked")){
			$('.filters').css('opacity','1');
			$('label.c').css('color','#000');
			$('label.c').css('backgroundColor','#FFF');
		}
		else {
			$('.filters').css('opacity','0');
			$('label.c').css('color','#FFF');
			$('label.c').css('background','none');
		}
	});

	$(document).on('click', 'button.cta.rent', function(){
	// $('button.cta.rent').click(function(){
		sid = $(this).attr('sid')
		$('.payment-container.payment').css('display','block');
		$('article.space').each(function(i,o){
			setTimeout(function(){
				$('article.space').eq(i).css('opacity','0');
				$('article.space').eq(i).css('top','-20px');
			},100*(i));
		});
		setTimeout(function(){
			$('section.spaces').css('opacity',0);
		},300);
		setTimeout(function(){
			$('section.spaces').css('display','none');
			$('.payment-container.payment').css('opacity',1);
		},500);
		setTimeout(function(){
			$('.payment-container.payment').css('top','0px');
		},500);
	});

	$(document).on('click', '.delete', function(e){
		var data = {
			sid : $(this).attr('sid')
		}
		var elem = this;
		$.ajax({
			type	 :'POST',
			url	 :'/deleteSpace',
			data	 : data,
			dataType	: 'json',
			success	 : function(data) {
				console.log('deleting')
				$(elem).closest('article.space').css('display','none');
			}
		});
	});

	$('#checkout').click(function(e){
		e.preventDefault();
		console.log("#hello")
		$('.loaders.icon').css('opacity','1');
		$('.payment-container.success-message').css('display','block');
		$('.payment-container.payment').css('top','150px');
		$('.payment-container.payment').css('opacity',0);
		$('section.spaces.listing').css('opacity',0);
		var data = {
			'cardtype'	: $('#cardtype').val(),
			'firstname'	: $('#firstname').val(),
			'lastname'	: $('#lastname').val(),
			'cardnumber': $('#cardnumber').val(),
			'csc'		: $('#csc').val(),
			'month'		: $('#month').val(),
			'year'		: $('#year').val(),
			'line1'		: $('#line1').val(),
			'line2'		: $('#line2').val(),
			'city'		: $('#city').val(),
			'state'		: $('#State').val(),
			'zipcode'	: $('#zipcode').val(),
			'email'		: $('#emailss').val(),
			'sid'		: sid,
		};
		console.log(data)
		$.ajax({
			type	 :'POST',
			url	 :'/submitPayment',
			data	 : data,
			dataType	: 'json',
			success	 : function(data) {
				console.log(data)
				if (data.success == true){
					// when.document.href="google.com"
					setTimeout(function(){
						$('.payment-container.success-message').css('opacity','1');
						$('.payment-container.success-message').css('marginTop','-10px');
						$('.loaders.icon').css('opacity','0');
					},000);
					setTimeout(function(){
						$('.payment-container.payment').css('display','none');
						$('section.spaces.listing').css('display','none');
					},0);
				}

			}
		});




	});
	$('.checkout').click(function(e){
		e.preventDefault();
		console.log("#hello")
		$('.loaders.icon').css('opacity','1');
		$('.payment-container.success-message').css('display','block');
		$('.payment-container.payment').css('top','150px');
		$('section.spaces.listing').css('opacity',0);
		$('section.spaces.listing').css('top','150px');

		data = {
			'space_title'	: $('#space_title').val(),
			'space_desc'	: $('#space_desc').val(),
			'feature_pool'	: $('#feature_pool').is(':checked'),
			'feature_grill'	: $('#feature_grill').is(':checked'),
			'feature_tennis'	: $('#feature_tennis').is(':checked'),
			'feature_bar'	: $('#feature_bar').is(':checked'),
			'feature_porch' : $('#feature_porch').is(':checked'),
			'feature_fire_pit' : $('#feature_fire_pit').is(':checked'),
			'feature_other'	: $('#feature_other').is(':checked'),
			'feature_other_text' : $('#feature_other_text').val(),
			'street_one'	: $('#street_one').val(),
			'street_two':$('#street_two').val(),
			'city':$('#city2').val(),
			'state':$('#state').val(),
			'zipcode':$('#zipcode').val(),
			startDate:$('#start-date').val(),
			endDate:$('#end-date').val(),
			dates: ['99-99-9999'],
			// image_url: $('#space_image').val(),
			'image_url':$('#filepicker_button').css("backgroundImage").slice(4).slice(0,-1),
			price: $('#price').val()
		};
		console.log(data)
		$.ajax({
			type	 :'POST',
			url	 	 :'/addSpace',
			data	 : data,
			dataType : 'json',
			success	 : function(data) {
				if (data.success)
					// alert('form successfully submitted')
					setTimeout(function(){
						$('.payment-container.payment').css('opacity',0);
						$('.payment-container.success-message').css('opacity','1');
						$('.payment-container.success-message').css('marginTop','-10px');
						$('.loaders.icon').css('opacity','0');
					},000);
					setTimeout(function(){
						$('.payment-container.payment').css('display','none');
						$('section.spaces.listing').css('display','none');
					},0);
			}
		});
	});
});
