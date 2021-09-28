// старая форма корзины без yclients

const spas = require('./data/spadata')
import CountUp from './function/countUp.min'
import moment from '../../../plugins/moment/moment'
import getWeekDay from './function/getday'
import getTotalCost from './function/gettotalcost'
import getParams from './function/getParams'
import * as c from './data/const.js'

const priceId = 'price' + c.popupSpa.slice(4);

const $price_field = $(c.popupSpa + " input[name*='price']"); 
const $id_field = $(c.popupSpa + " input[name*='id']");
const $day_field = $(c.popupSpa + " input[name*='day']");
const $time_field = $(c.popupSpa + " input[name*='time']");
const $date_field = $(c.popupSpa + " input[name*='date']");
const $spa_field = $(c.popupSpa + " select[name*='spa']");
const $submit = $(c.popupSpa + " :submit");

const $email_field = $(c.popupSpa + " .t-input-group_em");
const $cash_field = $(c.popupSpa + " .t-input-group_pm .t-radio__control:first-child");
const $sber_field = $(c.popupSpa + " .t-input-group_pm .t-radio__control:last-child");

let easingFn = function (t, b, c, d) {
    let ts = (t /= d) * t;
    let tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
    };

const CountUpOptions = {
    separator : ' ', 
    easingFn,
    decimal : '.', 
    prefix: '',
    suffix: ' руб.'
  };

const sec2time = (timeInSeconds) => {
    let pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);
    return pad(minutes, 2) + ':' + pad(seconds, 2);
};

const updatePrice = (price = 0) => {
    let id = $id_field.val();       
    price = price !== 0?price:$price_field.val();
    window.tcart.total = price;
    window.tcart.prodamount = price;
    window.tcart.amount = price;    
    window.tcart.products[0].name = id !== -1?spas[id].title:spas[0].title;
    window.tcart.products[0].price = price;
    window.tcart.products[0].amount = price; 
   // console.log(window.tcart);   
};

const loadingField = (start = true, allFields = true) => {
  $submit.prop( "disabled", start );
  $spa_field.prop( "disabled", start );
  $date_field.prop( "disabled", start );
  $time_field.prop( "disabled", start );
  if(start){
    $(c.popupSpa + ' .t706__form-upper-text').addClass('loading');
  //  $('#' + priceId).addClass('loading');
      if(allFields){
        $date_field.addClass('loading');
        $time_field.addClass('loading');
      }else{
        $time_field.addClass('loading');
      };
  }else{
    $date_field.removeClass('loading');
    $time_field.removeClass('loading');
    $(c.popupSpa + ' .t706__form-upper-text').removeClass('loading');
 //   $('#' + priceId).removeClass('loading');
  }
}

const updateCart = (total = -1, id = -1, date = 0, time = 0) => { 

    loadingField();
    if(total === -1 && id === -1 && date === 0 && time === 0){                  
        $date_field.data('value', c.nextDay ); // .attr('value', date )
        $day_field.val(getWeekDay(c.nextDay, $time_field.attr( 'value' )));
        $time_field.val(sec2time(900)).attr( 'value', 900 );
    }else{   
    let oldprice = $price_field.val();
    if(time === 0){ time = $time_field.attr( 'value' ); }else{ $time_field.val(sec2time(time)).attr( 'value', time ); };
    let day = $day_field.val();   
    if(date !== 0){  
               // $date_field.addClass('t-input_bbonly'); //.attr('value', date );
                day = getWeekDay(date, $time_field.attr( 'value' ));               
                $day_field.val(day);
            };        
    if(id === -1){ id = $id_field.val(); }else{
        $id_field.val(id);
        $(c.popupSpa + ' .t706__cartwin-heading').text( spas[id].title );
        $(c.popupSpa + ' .t706__form-upper-text').text( 'за ' + spas[id].minhours + ' часа до ' + spas[id].person  + ' гостей');
        if($(c.popupSpa + " select[name*='spa'] option:selected").index() !== id){ $(c.popupSpa + " select[name*='spa']").prop('selectedIndex', id); }; 
    };     
   
    if(total === -1){              
     total = getTotalCost(time, day, id);
    };
    $price_field.val(total); 
    const demo = new CountUp(priceId, oldprice, total, 0, 0.7, CountUpOptions);
    demo.start(); 
  }; 
    setTimeout(() => {
      loadingField(false);
    }, 500);
};

$(document).ready(function(){ 

    /* Обновляем продукт и цены перед отправкой формы в платежную систему */

    window.myAfterSendedFunction = function ($form) {             

        /* номер заявки (Lead ID) */
        var formresult = $form.data('tildaformresult');
        var leadid = formresult.tranid;

        /* все поля заявки */
        var formArr = $form.serializeArray();

      //  console.log(formArr);

      //  throw new Error("Something went badly wrong!");

    };    

    $('.t706 form').each(function () {          
        $(this).data('formsended-callback', 'window.myAfterSendedFunction');       
    });

if($(c.popupSpa).length ){ 
    $(c.popupSpa + ' .t706__cartwin-products').remove();
    $(c.popupSpa + ' .t706__cartwin-bottom').remove();
    $(c.popupSpa + ' .t-input-group_pm .t-input-title').remove();
    $(c.popupSpa + ' .t706__form-upper-text').after('<div id="' + priceId + '" class="t702__price">0</div>');
    $(c.popupSpa + " input[name*='Email']").val('no@email.net');
    $(c.popupSpa + " input[name*='Name']").addClass('t-input_bbonly');
    $(c.popupSpa + " input[name*='Phone']").addClass('t-input_bbonly');    
    $email_field.hide();
    $cash_field.hide();
    $id_field.val(0);
    $price_field.val(0);  
    updateCart();

    $date_field.pickadate({
        min: c.fistDayBook,
        max: c.maxDaysVisible,
        yearSelector: false,
        format: 'dd mmmm, ddd',
       // formatSubmit: 'dd-mm-yyyy',
        today: '',
        onStart: function() {
            $date_field.addClass('t-input_bbonly').attr('value', c.nextDay ); // .data('value', c.nextDay ); //   
          },
        onSet: function(context){       	
            updateCart( -1, -1, context.select );
          }
    });
    
    
    $time_field.pickatime({
        format: 'HH:i',
        formatLabel: 'HH:i',
        formatSubmit: 'HH:i',
        interval: 60,
        min: [c.morningHourOpen,0],
        max: [c.lastHourBook,0],
        onStart: function() {  
            $time_field.addClass('t-input_bbonly').val(sec2time(900)).attr( 'value', 900 );            
          },
        onSet: function(c) {            
            updateCart( -1, -1, 0, c.select );
          }
    });

    $spa_field.change(function() {
        let id = $(c.popupSpa + " select[name*='spa'] option:selected").index();        
        updateCart( -1, id ); 
    });

    

    $(c.popupSpa +' input[type=radio][name=paymentsystem]').change(function() {
        if (this.value == 'sberbank') {
            $email_field.show();
            $cash_field.show();
            $(c.popupSpa + ' .t-submit').text('Оплатить');
            $(c.popupSpa + " input[name*='Email']").addClass('t-input_bbonly').val('');            
        }
        else if (this.value == 'cash') {
            $(c.popupSpa + ' .t-submit').text('Отправить заявку');
        };
        
    });

    $(document).on('click','a[href="#close"], '+ c.popupSpa +' .t396__filter',function(e){
        updateCart();
        $("body").css("overflow","auto");
        $("#nav188296220").css("position","fixed");
        if(c.isSmall){  $("#rec196832202").css("position","relative");  
	    $("#rec238782757 .t450__burger_container").css("display","block");
    };
   });

   $(document).on('click',c.popupSpa + ' .t-popup__close',function(){
        updateCart();
        $("body").css("overflow","auto");
        $("#nav188296220").css("position","fixed");
        if(c.isSmall){ $("#rec196832202").css("position","relative");
        $("#rec238782757 .t450__burger_container").css("display","block");
      };
    });

    $(`#form${c.popupSpa.slice(4)}.js-form-proccess`).data('formsended-callback', 'window.hideInput' );

    window.hideInput = function () {
         $(c.popupSpa + ' .t706__cartwin-heading').text('ЗАЯВКА ОТПРАВЛЕНА');
         $(c.popupSpa + ' .t706__form-upper-text').hide();
         $(c.popupSpa + ' .t702__price').hide();
         $(c.popupSpa + ' .t-form__inputsbox').hide();
         $(c.popupSpa + ' .t706__form-bottom-text').hide();
         updatePrice();
    };




$('a[href^="#openspa"]').on('click', function(e){
    
    let href = $(this).attr('href');
    let param = getParams(href); 
    let id = param.spa === undefined || param.spa === NaN?$id_field.val():param.spa;    

    updateCart(-1, id);

    let showSpa = param.show === undefined || param.show === NaN?1:param.show; 
    if(showSpa !== 1){ $(c.popupSpa + " .t-input-group_sb").hide(); }else{ $(c.popupSpa + " .t-input-group_sb").show(); }; 
    $(c.popupSpa + " select[name*='spa']").prop('selectedIndex', id); 

    let showSber = param.sber === undefined || param.show === NaN?1:param.sber;
    if(showSber !== 1){ $sber_field.hide(); }else{ $sber_field.show(); };      

});


$('a[href^="#order"]').on('click', function(e){   

    $("body").css("overflow","hidden");    

    if(c.isSmall){ $("#rec196832202").css("position","absolute"); };

    $("#nav188296220").css("display","none");
    $('#rec200918319').removeClass('active');
    $("#rec205099373 .t450__burger_container").css("display","none");
	  $("#rec238782757 .t450__burger_container").css("display","none");
  	$("#rec196832202 .t450__burger_container").css("display","none");
    
    let href = $(this).attr('href');
    let param = getParams(href);                
    let id = param.spa === undefined || param.spa === NaN?$id_field.val():param.spa; 

    updateCart( -1, id );

    let showSpa = param.show === undefined || param.show === NaN?1:param.show; 
    if(showSpa !== 1){ $(c.popupSpa + " .t-input-group_sb").hide(); }else{ $(c.popupSpa + " .t-input-group_sb").show(); }; 
    $(c.popupSpa + " select[name*='spa']").prop('selectedIndex', id);   

    let showSber = param.sber === undefined || param.show === NaN?1:param.sber;
    if(showSber !== 1){ /* console.log(showSber); */ $sber_field.hide(); }else{ $sber_field.show(); };

   });   

    jQuery(function($){
        $(document).mouseup(function (e){ // событие клика по веб-документу
            let div = $(c.popupSpa + ' .t706__cartwin-content'); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам                    
                   // $('#rec200918319').addClass('active');
                   $("body").css("overflow","auto");
                   if(c.isSmall){  $("#rec196832202").css("position","relative");  };
                   $("#nav188296220").css("display","block");
        $("#rec238782757 .t450__burger_container").css("display","block");
            }
        });
    });

          /* Получение данных из формы на главной  */
         
          if($(c.mainFormSpa).length && !c.isSmall && $(c.popupSpa).length){      
           
          /* Если форма на главной отправляется успешно то данные передаем в корзину для дальнейшего оформления */
            $(`#form${c.mainFormSpa.slice(4)}.js-form-proccess`).data('success-callback', 'window.openCart' );
        
            window.openCart = function() {
              
              let id = $(c.mainFormSpa + " select[name*='spa'] option:selected").index();       
              
              updateCart( -1, id );  

              $('a[href="#order:bookspa=1?sber=0"]').attr('href', '#order:bookspa='+ id + '?sber=0');
              /* запускаем форму */
              $('a[href="#order:bookspa='+ id + '?sber=0"]').click().after(function(){
                  /* прячем форму на главной */
                  $(c.mainFormSpa).hide(); 
              });

              };
            };

    
    };

});