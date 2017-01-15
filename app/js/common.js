$(function() {

	$('#block-menu').children('ul').after('<div id="mobile-menu">').clone().appendTo('#mobile-menu');
	$('#mobile-menu').parent().after('<a href="#mobile-menu" class="toggle-mnu hidden-lg"><span></span></a>');
	$(".toggle-mnu").click(function() {
	  $(this).addClass("on");
	});
	$('#mobile-menu').mmenu({
		extensions : [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
		navbar: {
			title: "GTA"
		}
	});
	var api = $("#mobile-menu").data("mmenu");
	api.bind("closed", function () {
		$(".toggle-mnu").removeClass("on");
	});
});
