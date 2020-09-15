
// https://github.com/customd/jquery-visible

const spas = require('./spadata')
import CountUp from './countUp.min'
import moment from '../../../plugins/moment/moment'


$(document).ready(function(){ 

	var height = document.documentElement.clientHeight;
	var width = document.documentElement.clientWidth;
	var pathname = window.location.pathname; 

	var isSmall = false;
	var isMedium = false;
	var isLarge = false;
	var isXLarge = false;
	var fileName = 'large';
	var picSize = 'M';

	if(width < 768){ isSmall = true; fileName = 'small'; picSize = 'S'; }else{
		if(width > 767 && width < 1068){ isMedium = true; fileName = 'medium'; }else{
			if(width > 1067 && width < 1440){ isLarge = true; }else{ isXLarge = true; fileName = 'xlarge'; picSize = 'X'; }
		}
	}

	if( $('.video-bg').length ){
		if(pathname != '/'){ pathname = pathname + '/' }; 
		var videoFile = 'https://bordata.ru/files/videos'+pathname+fileName+'.mp4';
		var picFile = 'https://bordata.ru/files/videos'+pathname+'poster'+picSize+'.jpg';
		$('.video-bg video').controls = false;		
		$('.video-bg video').attr('poster', picFile).attr('src',videoFile).after(function() {  
			$('#mp4BgVideo').attr('src',videoFile).after(function(){
				$('.video-bg').vidbacking().after(function(){
					$('.video-bg video').prop('muted',true).trigger('play');
				 });
			 });		 
		});	
	 };

	 $("body").css("overflow","hidden");	 

	setTimeout(function() {

		if($('#rec193546060').length ){  $("#rec193546060").delay(150).fadeOut('slow').hide(); };
		if($('#rec191800303').length ){ $("#rec191800303").delay(150).fadeOut('slow').hide(); };
		if($('.preloader').length ){ $(".preloader").delay(250).hide(); };
		$("body").css("overflow","auto");

	 }, 500);


// form on mainpage 
// $("body").append("<a id='bookone' href='#bookone' style='display:none'></a>");
// form on spas page 
// $("body").append("<a id='bookspa' href='#bookspa' style='display:none'></a>");
// pop up spas and services
// $("body").append("<a id='popupzero' href='#popupzero' style='display:none'></a>");

window.addEventListener("orientationchange", function() {
	// location.reload();
}, false);

(function($){
	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *		 the user visible viewport of a web browser.
	 *		 only accounts for vertical position, not horizontal.
	 */
	$.fn.visible = function(partial){
		
	    var $t				= $(this),
	    	$w				= $(window),
	    	viewTop			= $w.scrollTop(),
	    	viewBottom		= viewTop + $w.height(),
	    	_top			= $t.offset().top,
	    	_bottom			= _top + $t.height(),
	    	compareTop		= partial === true ? _bottom : _top,
	    	compareBottom	= partial === true ? _top : _bottom;
		
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };
    
})(jQuery);



/*

$(window).on('load', function () {
 $("#rec191800303").delay(350).fadeOut('slow');
 setTimeout(function() {  $("body").css("overflow","auto"); }, 300);
});

*/


	var rumoment= moment();
	rumoment.locale('ru'); 	

	if( $('#rec201554475').length ) {

		var updiv = $('#rec205263712');
		var offset = $( '#rec201554475' ).offset();
		var h = '';

		$( "#rec201554475 .t397__select" ).change(function(){
			var g = updiv.offset().top + updiv[0].scrollHeight;
			$('#rec201554475').removeClass('fix');
					$('#rec201554475').removeClass('active');
					updiv.removeClass('mbottom');
			$(window).scrollTop(g);
		});

	};

	 
	$(window).scroll(function(){

		if( $('#rec201554475').length  ){
			h = offset.top - $(window).scrollTop();
			if(h < - 92){
				updiv.addClass('mbottom');
				$('#rec201554475').addClass('fix');
				if(h < -300){ $('#rec201554475').addClass('active'); }
			}else{ 
				if( h > - 1 ){
				$('#rec201554475').removeClass('fix');
				$('#rec201554475').removeClass('active');
				updiv.removeClass('mbottom');
				}
			}
		} 

		

		if( $('.video-part').length ){

			var video = '';

					$('.video-part').each(function(){

				
					if ( $(this).length && $(this).visible(true) ) {
							if(!$(this).hasClass( 'played' )){
								
								$(this).addClass('played');
								$(this).removeClass('paused');
								$(this).delay(500).trigger('play');
							//	this.paused ? this.play() : this.pause();
							}
						}else{
							if(!$(this).hasClass( 'paused' )){
								
								$(this).removeClass('played');
								$(this).addClass('paused');
								$(this).trigger('pause');
							//	this.paused ? this.play() : this.pause();
								$(this).get(0).currentTime = 0;
							}
						} 
					}) 
			};


			if(pageYOffset > 700){
				$('#rec191919056').addClass('fixed-top'); }else{
					$('#rec191919056').removeClass('fixed-top');
				}
			
				if(pageYOffset > 10){
					$('.tn-elem__1953083171590690975626 .tn-atom__sbs-anim-wrapper').removeClass('start');
					$('.tn-elem__1955752531589636366534 .tn-atom__sbs-anim-wrapper').removeClass('start');
					$('.tn-elem__2052484401592985188446 .tn-atom__sbs-anim-wrapper').removeClass('start');
					$('.tn-elem__2053694291592985188446 .tn-atom__sbs-anim-wrapper').removeClass('start');
					$('.tn-elem__2052484401592937230072 .tn-atom__sbs-anim-wrapper').removeClass('start');
				 }else{
					$('.tn-elem__1953083171590690975626 .tn-atom__sbs-anim-wrapper').addClass('start');
					$('.tn-elem__1955752531589636366534 .tn-atom__sbs-anim-wrapper').addClass('start');
					$('.tn-elem__2052484401592985188446 .tn-atom__sbs-anim-wrapper').addClass('start');
					$('.tn-elem__2053694291592985188446 .tn-atom__sbs-anim-wrapper').addClass('start');
					$('.tn-elem__2052484401592937230072 .tn-atom__sbs-anim-wrapper').addClass('start');
					}

	});
	

	var loadMore = $('.tn-elem__2028549021589370264069 .tn-atom');
	var textMore = $('.tn-elem__2028549021589370264074');
	

	$(document).on('click', loadMore, function() {
		textMore.toggleClass('open');
	});

	// глобальная ФОРМА БАНЬ 

	if($('#rec202444621')){ 
		
		$("#rec202444621 input[name*='date']").data('value', rumoment.format('YYYY/MM/DD') ).attr('value', rumoment.format('YYYY/MM/DD') );
		$("#rec202444621 input[name*='time']").val('14:00');
		
		
		$("#rec202444621 input[name*='date']").pickadate({
			min: true,
			yearSelector: false,
			format: 'dd mmmm, ddd',
			formatSubmit: 'dd-mm-yyyy'
		});
		
		$("#rec202444621 input[name*='time']").pickatime({
			format: 'HH:i',
			formatLabel: 'HH:i',
			formatSubmit: 'HH:i',
			interval: 60,
			min: [11,0],
			max: [22,0]		    
		})

	   $(document).on('click','a[href="#close"], #rec202444621 .t396__filter',function(e){
			$("#rec201032281 input[name*='price']").val('');
			$("#rec201032281 input[name*='date']").val('');
			$("#rec201032281 input[name*='time']").val('14:00');
	   });

	   $(document).on('click','#rec202444621 .t-popup__close',function(e){
			$("#rec201032281 input[name*='price']").val('');
			$("#rec201032281 input[name*='date']").val('');
			$("#rec201032281 input[name*='time']").val('14:00');
  		 });

	};



});