function parallaxScroll(){var e=$(window).scrollTop();$("body").css("backgroundPosition","0px "+e*-0.25+"px")}$(document).ready(function(){$(".find").click(function(){$(".loaders.icon").css("opacity","1");if($(".titler").val()=="looking for"){var e=$("section.landing-header").height();$("section.landing-header").css("marginTop","-"+e+"px");$("section.spaces.avail").css("opacity",1);$("section.spaces.avail").css("display","block");$("article.space").each(function(e,t){setTimeout(function(){$("article.space").eq(e).css("opacity","1");$("article.space").eq(e).css("top","0px");$(".loaders.icon").css("opacity","0")},1e3+100*(e+1))})}else{var e=$("section.landing-header").height();$("section.landing-header").css("marginTop","-"+e+"px");$("section.spaces.listing").css("opacity",1);$("section.spaces.listing").css("display","block")}});$(window).scroll(function(){parallaxScroll()});$("label.c input").click(function(){if($("#filter-button").is(":checked")){$(".filters").css("opacity","1");$("label.c").css("color","#000");$("label.c").css("backgroundColor","#FFF")}else{$(".filters").css("opacity","0");$("label.c").css("color","#FFF");$("label.c").css("background","none")}});$("button.cta.rent").click(function(){$(".payment-container.payment").css("display","block");$("article.space").each(function(e,t){setTimeout(function(){$("article.space").eq(e).css("opacity","0");$("article.space").eq(e).css("top","-20px")},100*e)});setTimeout(function(){$("section.spaces").css("opacity",0)},300);setTimeout(function(){$("section.spaces").css("display","none");$(".payment-container.payment").css("opacity",1)},500);setTimeout(function(){$(".payment-container.payment").css("top","0px")},500)});$("#checkout").click(function(e){e.preventDefault();console.log("#hello");$(".loaders.icon").css("opacity","1");$(".payment-container.success-message").css("display","block");$(".payment-container.payment").css("top","150px");$(".payment-container.payment").css("opacity",0);$("section.spaces.listing").css("opacity",0);setTimeout(function(){$(".payment-container.success-message").css("opacity","1");$(".payment-container.success-message").css("marginTop","-10px");$(".loaders.icon").css("opacity","0")},1e3);setTimeout(function(){$(".payment-container.payment").css("display","none");$("section.spaces.listing").css("display","none")},1010)});$(".checkout").click(function(e){e.preventDefault();console.log("#hello");$(".loaders.icon").css("opacity","1");$(".payment-container.success-message").css("display","block");$(".payment-container.payment").css("top","150px");$("section.spaces.listing").css("opacity",0);$("section.spaces.listing").css("top","150px");setTimeout(function(){$(".payment-container.payment").css("opacity",0);$(".payment-container.success-message").css("opacity","1");$(".payment-container.success-message").css("marginTop","-10px");$(".loaders.icon").css("opacity","0")},1e3);setTimeout(function(){$(".payment-container.payment").css("display","none");$("section.spaces.listing").css("display","none")},1010)})});