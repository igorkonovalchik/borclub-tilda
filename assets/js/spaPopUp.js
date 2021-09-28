


    const spas = require('./data/spadata')
    import moment from '../../../plugins/moment/moment'
    import getParams from './function/getParams'
    
    const popupSpa = '#rec201032281';

	var rumoment= moment();
    rumoment.locale('ru'); 

	// pop up 

	$(document).ready(function() {

		var ZeroPopID = '#rec202876391';//ID Zero
		var PopWindID = '#rec202882730';//ID PopUp окна BF503
		var href = "";
		var HrefPopID = "#";
		var ActivePop = '';
		var id = 0;
		var param = [];	
		
		$(PopWindID + " .t-popup__container").addClass("shirina").html($(ZeroPopID).html()).parent(".t-popup").addClass("parpadding");		   
		 
		// $('a[href^="#popupzero"]').click(function(e) {		

	$('a[href^="#openspa"]').on('click', function(e){

		// console.log('Startload');		

			e.preventDefault();
			href = $(this).attr('href');
			if(href.length > 10){
			param = getParams(href);
			HrefPopID = HrefPopID + param.id;	
			
			$("#nav188296220").css("position","absolute");
			$("#rec205099373 .t450__burger_container").css("display","none");
			$("#rec238782757 .t450__burger_container").css("display","none");
			$("#rec196832202 .t450__burger_container").css("display","none");
			
			
			if(typeof param.spa !== "undefined"){ id = param.spa; };

			if(HrefPopID != "#"){

			/*	if(typeof param.spa !== "undefined"){ 

					let day = $(popupSpa + " input[name*='day']").val();
					let currentTime = $(popupSpa + " input[name*='time']").attr( 'value' );
					let TotalCost = getTotalCost(currentTime, day, id); 					

					var opt = {
						separator : ' ',
						decimal : '.', 
						prefix: '',
						suffix: ' руб.'
					};

					let hourp = (id == 0)?'часов':'часа';						
				
					$(popupSpa + " input[name*='id']").val(id);
					$(popupSpa + " input[name*='price']").val( TotalCost );
					$(popupSpa + ' .t702__title').text( spas[id].title );
					$(popupSpa + ' .t702__descr').text( 'от ' + spas[id].minhours + ' ' + hourp + ' до ' + spas[id].person  + ' гостей');
					var startprice = new CountUp("valprice", 0, TotalCost, 0, 0.2, opt);
					setTimeout(function(){ 
						startprice.start();
					 }, 600);
					$('#rec200918319 .tn-elem__2009183191591781411602 a').attr('href', spas[id].url);
					
				}; */
			
			 ActivePop = HrefPopID;
			 
			 $("body").append('<div id="' + ZeroPopID.substring(1)+'">' + $(PopWindID + " .t-popup__container").html()  + '</div>'); 

			 setTimeout(function(){ $(PopWindID + " .t-popup__container").html( $(ActivePop)).parent(".t-popup").addClass("parpadding"); }, 500);
			 
			 HrefPopID = "#";

			 $("a[href='#popupzero']").click();
			 
			 $(PopWindID + ' .t-popup').animate({
				scrollTop: 2
			  }, 800);

			  $(PopWindID + ' .t-popup').animate({
				scrollTop: 0
			  }, 1200);			  
			

			 setTimeout(function(){ 
				/* $(ActivePop + ' .t396').trigger('displayChanged');
				 t_lazyload_detectwebp();
				 t_lazyload_update(); */
				 $('#rec200918319').addClass('active');				 
				 }, 10);

			  }
			}
		   });

		   $(document).on('click','a[href="#close"], ' + ActivePop + ' .t396__filter',function(e){			   
			   e.preventDefault();
					t390_closePopup(PopWindID.replace(/[^0-9]/gim, ""));
					$("body").append('<div id="'+ActivePop.substring(1)+'">' + $(PopWindID + " .t-popup__container").html()  + '</div>');  
					$(PopWindID + " .t-popup__container").addClass("shirina").html($(ZeroPopID)).parent(".t-popup").addClass("parpadding");
			
			    if(!$(PopWindID + ' .t-popup').hasClass('t-popup_show')){ 
						$('#rec200918319').removeClass('active');	
						$("#nav188296220").css("position","fixed");
					//	$("#rec205099373 .t450__burger_container").css("display","block");
						$("#rec238782757 .t450__burger_container").css("display","block");
					//	$("#rec196832202 .t450__burger_container").css("display","block");
				   }
			});

			$(document).on('click', PopWindID + ' .t-popup__close',function(e){
				if(!$(PopWindID + ' .t-popup').hasClass('t-popup_show')){ 
					$('#rec200918319').removeClass('active');
					e.preventDefault();
					$("#nav188296220").css("position","fixed");
				//	$("#rec205099373 .t450__burger_container").css("display","block");
					$("#rec238782757 .t450__burger_container").css("display","block");
				//	$("#rec196832202 .t450__burger_container").css("display","block");
					t390_closePopup(PopWindID.replace(/[^0-9]/gim, ""));
					$("body").append('<div id="'+ActivePop.substring(1)+'">' + $(PopWindID + " .t-popup__container").html()  + '</div>');  
					$(PopWindID + " .t-popup__container").addClass("shirina").html($(ZeroPopID)).parent(".t-popup").addClass("parpadding");
			   }
			});

		   $(ZeroPopID).delegate(".t-submit", "click", function(){
		   setTimeout(function(){if($(ZeroPopID+" .t-form").hasClass("js-send-form-success")){t390_closePopup(PopWindID.replace(/[^0-9]/gim, ""))}}, 1000);});
		
		});  	