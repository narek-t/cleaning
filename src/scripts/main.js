$(document).ready(function() {
	$('.bxslider').bxSlider({
		pager: false,
	});
	$('.topslider').bxSlider({
		// mode: 'fade',
		// speed: 1500
	});
	$('.fancybox').fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	$("li.has-sub > a").click(function() {
		$(this).toggleClass('closed');
		var ul = $(this).next(),
			clone = ul.clone().css({
				"height": "auto"
			}).appendTo(".mini-menu"),
			height = ul.css("height") === "0px" ? ul[0].scrollHeight + "px" : "0px";
		clone.remove();
		ul.animate({
			"height": height
		});
		return false;
	});
});