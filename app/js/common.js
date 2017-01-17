$(function() {

	$('#block-menu').children('ul').after('<div id="mobile-menu">').clone().appendTo('#mobile-menu');
	$('#mobile-menu').parent().after('<a href="#mobile-menu" class="toggle-mnu hidden-lg"><span></span></a>');
	$(".toggle-mnu").click(function() {
	  $(this).addClass("on");
	});
	$('#mobile-menu').mmenu({
		extensions : [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
		navbar: {
			title: "GTAAll.com Menu",
		}
	});
	var api = $("#mobile-menu").data("mmenu");
	api.bind("closed", function () {
		$(".toggle-mnu").removeClass("on");
	});


	$('#filter-custom').children('form').after('<div id="filter-custom-mobile">').clone().appendTo('#filter-custom-mobile');
	$('a[href="#filter-custom"]').after('<a href="#filter-custom-mobile">Filters</a>')
	// $('a[href="#filter-custom-mobile"]').click(function(){
	// 	alert(1);
		$('#filter-custom-mobile').addClass('white-popup mfp-with-anim mfp-hide');
		$('a[href="#filter-custom-mobile"]').magnificPopup({
			type: 'inline',

			fixedContentPos: false,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: false,
			
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'
		});
	// });
	
	// $('#filter-custom-mobile').mmenu({
	// 	extensions : [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
	// 	navbar: {
	// 		title: "GTAAll.com Menu",
	// 	}
	// });

	var az_pagination = $('#pagination-index');
	var az_cur_pag = az_pagination.data('current-page');
	var az_prev = az_pagination.find('a:contains("'+(az_cur_pag-1)+'")');
	var az_next = az_pagination.find('a:contains("'+(az_cur_pag+1)+'")');
	// if(az_prev.length > 0){
	// 	alert(az_prev.attr('href'));
	// }
	// if(az_next.length > 0){
	// 	alert(az_next.attr('href'));
	// }
	var az_pag_html = '<div id="pagination-index-mobile" class="paginator">'+
										'<span class="az-next">' + ((az_next.length > 0)?( '<a href="' + az_next.attr('href') + '">' + '\< next' + '</a>'):'') + '</span>' +
										'<span class="az-cur">' + '<em>' + az_cur_pag + '</em>' + '</span>' +
										'<span class="az-prev">' + ((az_prev.length > 0)?( '<a href="' + az_prev.attr('href') + '">' + 'prev \>' + '</a>'):'') + '</span>' +
										'</div>';
	// alert(az_pag_html);
	az_pagination.after(az_pag_html);
	// alert(az_cur_pag);
	// alert($('iframe').length);//attr('seamless', 'seamless');

});
