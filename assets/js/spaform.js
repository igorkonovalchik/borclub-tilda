    // Работа на странице бань
    
    const spas = require('./spadata')
    import CountUp from './countUp.min'
    import moment from '../../../plugins/moment/moment'
    import getWeekDay from './getday'
	import getTotalCost from './gettotalcost'
	
	const popupSpa = '#rec201032281';

	var rumoment= moment();
    rumoment.locale('ru'); 

    var getParams = function (url){
        var params = {};
        var query = url.substring(9);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };

    
    $(document).ready(function(){ 
    

	// Форма на странице бань

	if($(popupSpa + '').length ){ 

	//	$(popupSpa + ' .t-popup__close .t-popup__close-wrapper').prepend('<div class="notice" style="background: red; position: absolute; width: 100%; height: 50px; overflow: hidden; color: white; font-size: 14px; text-align: left; margin: 10px;"></div>');
	
		$(popupSpa + ' .t702__text-wrapper').append('<div id="valprice" class="t702__price"></div>');
		$(popupSpa + " input[name*='date']").data('value', rumoment.format('YYYY/MM/DD') ).attr('value', rumoment.format('YYYY/MM/DD') );
        $(popupSpa + " input[name*='time']").val('15:00').attr( 'value', 900 );
		$(popupSpa + " input[name*='day']").val(getWeekDay());
		
		var easingFn = function (t, b, c, d) {
			var ts = (t /= d) * t;
			var tc = ts * t;
			return b + c * (tc + -3 * ts + 3 * t);
			}
		var options = {
			separator : ' ', 
			easingFn,
			decimal : '.', 
			prefix: '',
			suffix: ' руб.'
		  };
		
		$(popupSpa + " input[name*='date']").pickadate({
			min: true,
			yearSelector: false,
			format: 'dd mmmm, ddd',
			formatSubmit: 'dd-mm-yyyy',
			onSet: function(context) {

			// console.log(context.select);

			//	let notice = context.select;
				
				var currentTime = $(popupSpa + " input[name*='time']").attr( 'value' );
				
				var day = getWeekDay(context.select);				
				
                var id = $(popupSpa + " input[name*='id']").val();

				var oldprice = $(popupSpa + " input[name*='price']").val();
								                
				let TotalCost = getTotalCost(currentTime, day, id);  	
				
			//	notice += '; day -' + day + '; TotalCost ' + TotalCost + '<br>';
				
				var demo = new CountUp("valprice", oldprice, TotalCost, 0, 0.7, options);
				demo.start();				 
			
				$(popupSpa + " input[name*='price']").val(TotalCost);
						
			//	$(popupSpa + ' .t-popup .t-popup__close .t-popup__close-wrapper .notice').prepend(notice);

                $(popupSpa + " input[name*='date']").data('value', context.select ).attr('value', context.select );
                $(popupSpa + " input[name*='day']").val(getWeekDay(context.select));
				
			  }
		});
		
		$(popupSpa + " input[name*='time']").pickatime({
			format: 'HH:i',
			formatLabel: 'HH:i',
			formatSubmit: 'HH:i',
			interval: 60,
			min: [11,0],
			max: [22,0],
			onSet: function(c) {

                var id = $(popupSpa + " input[name*='id']").val();
                var day = $(popupSpa + " input[name*='day']").val();
                var oldprice = $(popupSpa + " input[name*='price']").val();				                
                let TotalCost = getTotalCost(c.select, day, id);                  

				setTimeout(function(){ 
					var demo = new CountUp("valprice", oldprice, TotalCost, 0, 0.7, options);
					demo.start();
				 }, 10);
				setTimeout(function(){ 
					$(popupSpa + " input[name*='price']").val(TotalCost);
					$(popupSpa + " input[name*='time']").attr( 'value', c.select );
				 }, 50);				
			  }
		})

		$(document).on('click','a[href="#close"], '+ popupSpa +' .t396__filter',function(e){
			$(popupSpa + " input[name*='price']").val('');
		//	$(popupSpa + " input[name*='date']").val('');
		//	$(popupSpa + " input[name*='time']").val('14:00');
	   });

	   $(document).on('click',popupSpa + ' .t-popup__close',function(e){
		$(popupSpa + " input[name*='price']").val('');
	//	$(popupSpa + " input[name*='date']").val('');
	//	$(popupSpa + " input[name*='time']").val('14:00');
   });


	};

	
	// form on spa page 

	var once = false;
	
	$('a[href^="#bookspa"]').on('click', function(e){

		e.preventDefault();

		var href = $(this).attr('href');

		if(href.length > 8){

					var param = getParams(href);
					var id = param.spa;
				//	let notice = '';
				//	notice += 'currentTime -' + currentTime + '; day -' + day + '; TotalCost ' + TotalCost + '<br>';
				// $(popupSpa + ' .t-popup .t-popup__close .t-popup__close-wrapper .notice').prepend(notice);	
					
					var opt = {
						separator : ' ',
						decimal : '.', 
						prefix: '',
						suffix: '  руб.'
					};

                    let hourp = (id == 0)?'часов':'часа';
                    let currentTime = $(popupSpa + " input[name*='time']").val();
					let day = $(popupSpa + " input[name*='day']").val();	                    
					let TotalCost = getTotalCost(currentTime, day, id); 
					
					$(popupSpa + " input[name*='id']").val(id);
					$(popupSpa + " input[name*='price']").val( TotalCost);
					$(popupSpa + ' .t702__title').text( spas[id].title );
					$(popupSpa + ' .t702__descr').text( 'от ' + spas[id].minhours + ' ' + hourp + ' до ' + spas[id].person  + ' гостей');
					var startprice = new CountUp("valprice", 0, TotalCost, 0, 0.2, opt);

					if(!once){
						$('a[href="#bookspa"]').click();
						once = true;
					};

					setTimeout(function(){ 
						startprice.start();
					 }, 600);
		  
		}
	   });

		jQuery(function($){
			$(document).mouseup(function (e){ // событие клика по веб-документу
				var div = $(popupSpa + ' .t702__wrapper'); // тут указываем ID элемента
				if (!div.is(e.target) // если клик был не по нашему блоку
					&& div.has(e.target).length === 0) { // и не по его дочерним элементам
						once = false;
				}
			});
		});

	});
	


	
	// pop up 

	$(document).ready(function() {

		var ZeroPopID = '#rec202876391';//ID Zero
		var PopWindID = '#rec202882730';//ID PopUp окна BF503
		const popupSpa = '#rec201032281';
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

			console.log(param);	
			
			
			if(typeof param.spa !== "undefined"){ id = param.spa; };

			if(HrefPopID != "#"){

				if(typeof param.spa !== "undefined"){ 

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
					$('#rec200918319').addClass('active');
				};

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
			  
			 e.preventDefault();

			 setTimeout(function(){ $(ActivePop + ' .t396').trigger('displayChanged'); t_lazyload_detectwebp(); t_lazyload_update(); }, 10);

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
				   }
			});

			$(document).on('click', PopWindID + ' .t-popup__close',function(e){
				if(!$(PopWindID + ' .t-popup').hasClass('t-popup_show')){ 
					$('#rec200918319').removeClass('active');
					e.preventDefault();
					t390_closePopup(PopWindID.replace(/[^0-9]/gim, ""));
					$("body").append('<div id="'+ActivePop.substring(1)+'">' + $(PopWindID + " .t-popup__container").html()  + '</div>');  
					$(PopWindID + " .t-popup__container").addClass("shirina").html($(ZeroPopID)).parent(".t-popup").addClass("parpadding");
			   }
			});

		   $(ZeroPopID).delegate(".t-submit", "click", function(){
		   setTimeout(function(){if($(ZeroPopID+" .t-form").hasClass("js-send-form-success")){t390_closePopup(PopWindID.replace(/[^0-9]/gim, ""))}}, 1000);});
		
		});  	