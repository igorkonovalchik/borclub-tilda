// Работа на странице бань
    
const spas = require('./data/spadata')
import CountUp from './function/countUp.min'
import moment from '../../../plugins/moment/moment'
import getWeekDay from './function/getday'
import getTotalCost from './function/gettotalcost'
import getParams from './function/getParams'

const popupSpa = '#rec229653342';

var rumoment= moment();
rumoment.locale('ru'); 

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

$('a[href^="#order"]').on('click', function(e){

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

