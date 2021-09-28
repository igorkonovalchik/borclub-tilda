import moment from '../../../plugins/moment/moment'
import * as c from './data/const.js';

// console.log(JSON.stringify(c, null, '  '));

// hold top style for Safari

const topImportant = (el) => {
	$(el).each(function(i){
		if(!$(this).hasClass('topped')){
			const top = $(this).children('.tn-atom__sbs-anim-wrapper').css('top');   
			const newClass = `top-important-${i}`;   
			$("head").append('<style type="text/css"></style>');
			let new_stylesheet = $("head").children(':last');
			new_stylesheet.html(`.${newClass}{ top: ${top}!important; }`);		
			$(this).children('.tn-atom__sbs-anim-wrapper').addClass(newClass);
			$(this).addClass('topped');
		};		
	});
 };

$(document).ready(function(){

	let userAgent = navigator.userAgent.toLowerCase();
	let safari = /safari/.test(userAgent);
	
  const Cartrumoment = moment();
  Cartrumoment.locale('ru');
  let date = Cartrumoment.add(1,'days');  

  if($('#rec292631883').length ){ 
    const $date_event_field = $("#rec292631883 input[name*='date']");
    $date_event_field.pickadate({
      min: 1,
      yearSelector: false,
      format: 'dd mmmm, ddd',
     // formatSubmit: 'dd-mm-yyyy',
      today: '',
      onStart: function() {
        $date_event_field.addClass('t-input_bbonly').attr('value', date ); // .data('value', nextDay ); //   
        }
  });
  };
	

	if( $('.video-bg').length ){
		let pathname = c.pathname;
		if(pathname !== '/'){ pathname = pathname + '/' }else{ };
		let videoFile = 'https://bordata.ru/files/videos'+pathname+c.fileName+'.mp4';
		let picFile = 'https://bordata.ru/files/videos'+pathname+'poster'+c.picSize+'.jpg';
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



// open book form



if( $('#block-search').length && c.isSmall ) {

	$('#block-search').css('opacity', 0);
	$('a[href^="#openbook"]').on('click', function(e){
		$('.tn-elem__2372683081589532518829').hide();
		$('#block-search').css('opacity', 1);
	 });

};


	let rumoment= moment();
	rumoment.locale('ru');

	if( $('#rec201554475').length ) {

		let updiv = $('#rec205263712');
		let offset = $( '#rec201554475' ).offset();
		let h = '';

		$( "#rec201554475 .t397__select" ).change(function(){
			let g = updiv.offset().top + updiv[0].scrollHeight;
			$('#rec201554475').removeClass('fix');
					$('#rec201554475').removeClass('active');
					updiv.removeClass('mbottom');
			$(window).scrollTop(g);
		});

  };
  
// IF event cart change pay metod

  if( $('#rec283238048').length ) {
    
    $(function() {
      const $radios = $('input:radio[name=paymentsystem]');
      $radios.filter('[value=sberbank]').prop('checked', true);
  });
  }


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
		};

		if(safari){
				if($('#rec292549413').length ){ 	// /restaurant/rent	
					topImportant('#rec292549413 .t396 .t396__artboard .t396__elem'); 
				};

				if($('#rec195575253').length ){  	// /bani	
					topImportant('#rec195575253 .t396 .t396__artboard .t396__elem');
				};		
		};

		if( $('.video-part').length ){

			let video = '';

					$('.video-part').each(function(){


					if ( $(this).length && $(this).visible(true) ) {
							if(!$(this).hasClass( 'played' )){
								console.log('played');
								$(this).addClass('played');
								$(this).removeClass('paused');
								$(this).delay(500).trigger('play');
							//	this.paused ? this.play() : this.pause();
							}
						}else{
							if(!$(this).hasClass( 'paused' )){
								console.log('paused');
								$(this).removeClass('played');
								$(this).addClass('paused');
								$(this).trigger('pause');
							//	this.paused ? this.play() : this.pause();
								$(this).get(0).currentTime = 0;
							}
						}
					})
			};

			if(pageYOffset > 200){
				$('#rec283013101').addClass('add-shadow');
				$('#rec264011977').addClass('add-shadow');					
		 }else{			
				$('#rec283013101').removeClass('add-shadow');
				$('#rec264011977').removeClass('add-shadow');				
			};

				if(pageYOffset > 700){						
					$('#rec191919056').addClass('fixed-top');
			 }else{
					$('#rec191919056').removeClass('fixed-top');						
				};

				/* кнопка отель забронировать */
				if( $('#rec238212934').length && c.isSmall ){

					if( pageYOffset > 400 ){
						$('#rec238212934').addClass('active');
					 }else{
						$('#rec238212934').removeClass('active');
						};

        };
        

				if(pageYOffset > 5){
					$('.tn-elem__1953083171590690975626 .tn-atom__sbs-anim-wrapper').removeClass('start');
					$('.tn-elem__1955752531589636366534 .tn-atom__sbs-anim-wrapper').removeClass('start');
					$('.tn-elem__2052484401592985188446 .tn-atom__sbs-anim-wrapper').removeClass('start');
					$('.tn-elem__2053694291592985188446 .tn-atom__sbs-anim-wrapper').removeClass('start');
					$('.tn-elem__2052484401592937230072 .tn-atom__sbs-anim-wrapper').removeClass('start');
          $('.tn-elem__2222340101592937230072 .tn-atom__sbs-anim-wrapper').removeClass('start');
          $('.tn-elem__2925494131590484012067 .tn-atom__sbs-anim-wrapper').removeClass('start');
				 }else{
					$('.tn-elem__1953083171590690975626 .tn-atom__sbs-anim-wrapper').addClass('start');
					$('.tn-elem__1955752531589636366534 .tn-atom__sbs-anim-wrapper').addClass('start');
					$('.tn-elem__2052484401592985188446 .tn-atom__sbs-anim-wrapper').addClass('start');
					$('.tn-elem__2053694291592985188446 .tn-atom__sbs-anim-wrapper').addClass('start');
					$('.tn-elem__2052484401592937230072 .tn-atom__sbs-anim-wrapper').addClass('start');
          $('.tn-elem__2222340101592937230072 .tn-atom__sbs-anim-wrapper').addClass('start');
          $('.tn-elem__2925494131590484012067 .tn-atom__sbs-anim-wrapper').addClass('start');
					}

	});


	let loadMore = $('.tn-elem__2028549021589370264069 .tn-atom');
	let textMore = $('.tn-elem__2028549021589370264074');


	$(document).on('click', loadMore, function() {
		textMore.toggleClass('open');
	});



window.addEventListener("orientationchange", function() {
	 location.reload();
}, false);

// https://github.com/customd/jquery-visible


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

	    let $t				= $(this),
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


	// глобальная ФОРМА БАНЬ
/*
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
*/
/*
клики по кнопкам при опредленных ссылках
let shash = window.location.hash;
let tel = '';
			if(shash.substring(5, 9) === "call"){
					if(shash.substring(0, 9) === "#restcall"){ tel = '9216812812'; };
					if(shash.substring(0, 9) === "#banicall"){ tel = '9991812812'; };
					if(shash.substring(0, 9) === "#hotelcall"){ tel = '9301812812'; };
					$(window).scrollTop(100);
					$('body').append('<a id="call" href="tel:+7'+tel+'">Позвонить</a>');
					$('#call').css('display','none');
							$('#call').ready(function(){
									console.log('yes');
									setTimeout( function(){
											// $('a[href="tel:+7'+tel+'"]').click();
											$('#call').click();
											$(document).on('click', '#call', function(){
												console.log('live');
												});
									}, 1000);
								});
			};

*/



/*

$(window).on('load', function () {
 $("#rec191800303").delay(350).fadeOut('slow');
 setTimeout(function() {  $("body").css("overflow","auto"); }, 300);
});

*/


// form on mainpage
// $("body").append("<a id='bookone' href='#bookone' style='display:none'></a>");
// form on spas page
// $("body").append("<a id='bookspa' href='#bookspa' style='display:none'></a>");
// pop up spas and services
// $("body").append("<a id='popupzero' href='#popupzero' style='display:none'></a>");

});
