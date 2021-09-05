import './gift/gMain'
import './gift/gActivate'
import './gift/gThankYou'

/*
import * as coo from './cookie/cookie'
import * as c from './data/const'

let order = {};

if(coo.getCookie('orderGift', true) == undefined){
   coo.setCookie('orderGift', { 
      price: 0,
      gift: 'digital',
      design: 'green',
      nameRecipient: '',
      phoneRecipient: '',
      emailRecipient: '',
      anonim: 'no',
      nowsend: 'yes',
      fromGift: '',
      who: '',
      datere: '',
      timere: '',
      textGift: '',
      adress: '',
      namePayer: '',
      phonePayer: '',
      emailPayer: '',
      myself: 'no'   
    }, {expires: Date(1), domain: 'borclub.ru'});     
};

order = coo.getCookie('orderGift', true);

// console.log(order); 

const maxPrice = '200000';
const minPrice = '5000';
const stepPrice = '1000';  

const formPrice = '#form328806680';

const formRecipient = '#form333338756';
const formGiftText = '#form333346474';
const formPayer = '#form333366093';

const cartId = '#form337742765'; 


const checkDigital = $('#rec333216277 .tn-elem__3332162771625560404672'); 
const checkOffline = $('#rec333216277 .tn-elem__3332162771625560550712'); 

const zoneDigital = $('#rec333216277 .tn-elem__3332162771626428690552'); 
const zoneOffline = $('#rec333216277 .tn-elem__3332162771626428710170'); 

const pixDigital = $('#rec333216277 .tn-elem__3332162771625560793461'); 
const pixOffline = $('#rec333216277 .tn-elem__3332162771625559834267'); 

const checkGreen = $('#rec333332759 .tn-elem__3333327591625560404672'); 
const checkBlack = $('#rec333332759 .tn-elem__3333327591625560550712'); 

const zoneGreen = $('#rec333332759 .tn-elem__3333327591626429957304'); 
const zoneBlack = $('#rec333332759 .tn-elem__3333327591626429957317'); 

const pixGreen = $('#rec333332759 .tn-elem__3333327591625560793461'); 
const pixBlack = $('#rec333332759 .tn-elem__3333327591625559834267'); 

const delimiter = (number) => { // пробелы между тысячными   
   if(!number.toString().includes(' ')){   
      let ns = (parseInt(number) * 1).toString();
      let l = ns.length;
      let first = (l % 3 === 0) ? 3 : l % 3;
      let s = ns.substr(0, first);
      for(let i=first; i<l; i+=3) {
                  s += ' ' + ns.substr(i, 3);
      };
      return s;
    };
    return number;  
};

const updateCookie = (name, value) =>{ // перезаписывает новые данные заказа в куках
   order[name] = value;
  // console.log(`Update field - "${name}" - "${value}"`);
   coo.deleteCookie('orderGift');
   coo.setCookie('orderGift', order, {expires: Date(1), domain: 'borclub.ru'});
}
                 
const fillCart = (fn) => {      // добавляет сертификат в корзину, обновляет общую стоимость, заполняем форму
   let price = order.price;   
   window.tcart.total = price;
   window.tcart.prodamount = price;
   window.tcart.amount = price;       
   window.tcart.products.push({ name: 'Сертификат', amount: price }); 
  //  window.tcart.system = 'sberbank'; 
   const fields = Object.entries(order);
   for (const [key, value] of fields) { 
      if($(cartId + " input[name='" + key + "']").length && value !== ''){ 
          $(cartId + " input[name='" + key + "']").val( value ).attr( 'value', value);           
       };          
   };
   $(cartId + " input[name='Email']").val( order.emailPayer ).attr( 'value', order.emailPayer );
   $(cartId + " input[name='name']").val( order.namePayer ).attr( 'value', order.namePayer );
   $(cartId + " input[name='phone']").val( order.phonePayer ).attr( 'value', order.phonePayer );
  // console.log(window.tcart);  
  // console.log(order); 
   fn && fn();
};

const refreshPrice = (newPrice) => {
  newPrice = '' + newPrice;
  let id = 0;
  let spa = '';
  newPrice = Number(newPrice.replace(/\s/g, ''));
  newPrice = newPrice > Number(maxPrice) ? maxPrice : newPrice < Number(minPrice) ? minPrice : newPrice; 

  if( Number($('#sliderRange').val()) !== newPrice){
    $('#sliderRange').val(newPrice).change();                  
   }; 
   
  if( Number($("[name='inputRange']").val()) !== newPrice || $("[name='inputRange']").val() == ''){  
    $("[name='inputRange']").attr("value", delimiter( newPrice + '' )).val( delimiter( newPrice + '' ) );       
   }; 

  $('.gift').each(function(){     
    if(spa !== $(this).parent().data( 'spa' ) && spa !== ''){
      if(!$('#' + id).hasClass('show')){ 
        $('#' + spa + ' .gift').each(function() {
          if($(this).hasClass('show')){
            $(this).addClass('hide');
            $(this).removeClass('show');
          }; 
        });
        $('#' + id).addClass('show'); 
      };
      if(id !== 0){
        $('#' + spa).removeClass('close');
        $('#' + spa).addClass('open');
       }else{
        $('#' + spa).addClass('close');
        $('#' + spa).removeClass('open');
       };
      id = 0;
    };
    spa = $(this).parent().data( 'spa' );
    const giftPrice = Number($(this).data( 'price' ));
    if(newPrice >= giftPrice){ id = $(this).attr('id'); };
   });

   setTimeout(function () {
    $('.gift').each(function() {
                 $(this).removeClass('hide');
      });
              }, 350);

   if(!$('#' + id).hasClass('show')){
    $('#' + spa + ' .gift').each(function() {
      if($(this).hasClass('show')){
        $(this).addClass('hide');
        $(this).removeClass('show');
      }; 
    });
      $('#' + id).addClass('show');
   };

   if(id !== 0){
    $('#' + spa).removeClass('close');
    $('#' + spa).addClass('open');
   }else{
    $('#' + spa).addClass('close');
    $('#' + spa).removeClass('open');
   };  

   updateCookie('price', Number(newPrice)); 
  
};



$(document).ready(function(){   

        $('.tn-elem__3332162771627117911491 .tn-atom').html(
          `<div class="sp-wrap"><div class="sp-wave"></div></div>`
        ).addClass('loading');
   
         $(cartId + " input[name='paymentsystem'][value='sberbank']").prop('checked', true);

         const width = document.documentElement.clientWidth;         

         if(window.location.hash.includes('#!/tab/333363861')){
            $('.tn-elem__3333327591625571917544 a').click();          
         };

         if (width < 768) {

          setTimeout(function () {
              $('.tn-elem__3261126931625484766521 .card').toggleClass('flipped');
         }, 3000);

         } else {
            $(".tn-elem__3261126931623396735580").appendTo(".envelope .front .mailme");
            $(".tn-elem__3261126931623694773277").appendTo(".envelope .front .mailme");
            $(".tn-elem__3261126931623694690969").appendTo(".envelope .front .mailme");
            $('.tn-elem__3261126931623406992169').prependTo('.tn-elem__3261126931623311386607 .container');
            $('.tn-elem__3261126931623397020735').prependTo('.tn-elem__3261126931623311386607 .container');
            $('.tn-elem__3261126931623745252270').appendTo('.tn-elem__3261126931623311386607 .container');
         };


         if (!$('.envelope').hasClass('open')){
          
            setTimeout(function () {
               $('.envelope').addClass('open');
               setTimeout(function () {
                  $('.envelope').addClass('animated');
               }, 2800);
          
               let timerId = setInterval(() => $('.letter .card ').toggleClass('flipped'), 5000);            
               setTimeout(() => { clearInterval(timerId); }, 11000);

            }, 2500);

            $('.letter').click(function () {
               //  $('.envelope').addClass('send');
            });

            $('.letter .card').on('click', function () {

               function explode() {
                  $('.letter .card ').toggleClass('flipped');
               }
               setTimeout(explode, 400);

            });

         };      

         
         const addRangeSlider = (price = '0') => {   
            
            price = price == 0 ? delimiter( $(formPrice + " input[name='inputRange']").attr('placeholder') ) : delimiter( price );
                        
            // Добавляем сумму и символ рубля в форму данных плательщика

            $(formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(price);
            if ( !$(formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper label').length ){ 
               $(formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc').after('<label></label>'); 
            };  

            // Добавляем слайдер выбора номинала 
               
            if(!$(formPrice).hasClass('ajax-success')){              
               
               refreshPrice(price);                
               
               $(formPrice + " input[name='inputRange']").attr( 'placeholder', price );   
               $(formPrice + " input[name='inputRange']").after('<label></label>');                                        
   
               if(!$(formPrice + " .rangeslider-box").length ){  
                  $(formPrice + "  .t-input-group_in").after(
                  `
                  <div class="t-input-group rangeslider-box">
                        <input id="sliderRange" type="range" min="${minPrice}" max="${maxPrice}" step="${stepPrice}" value="${price.replace(/\s/g, '')}">
                        <div class="description-range">
                        <div class="min">${delimiter(minPrice)}</div>
                        <div class="max">${delimiter(maxPrice)}</div>
                        </div>
                  </div>
                  `           ); }; 
   
               $('#sliderRange')
               .rangeslider({
                  polyfill: false
               }).on('input', function() {    
                  refreshPrice(this.value);
                  $(formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(this.value); 
               });            
   
               $(formPrice).addClass('ajax-success');
   
               $(formPrice + " input[name='inputRange']").bind("change keyup input click", function() {
                  if (this.value.match(/[^0-9]/g)) {
                     this.value = this.value.replace(/[^0-9]/g, '');
                  };
               }); 
   
               $(formPrice + " input[name='inputRange']").on('change', function() {
                  refreshPrice(this.value);
                  $(formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(this.value); 
                });    

               };           
         };    

         const addGiftFields = () => { 

          $(formGiftText + " input[name*='nowsend']").parent().parent().hide(); // временно пока не сделаем

            $(formGiftText + " textarea[name*='textGift']").on('change', function() { 
               updateCookie('textGift', this.value );
            });
            
            $(formRecipient + " input[name*='myself']").change(function() {                  
              if (this.checked) { 
                updateCookie('myself', 'yes');
                $(".tn-elem__3333387561626430632839 a").attr('href', '#!/tab/333363861-5');
                $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-3');
                $('.tn-elem__3333387561626440005102').hide();
                $(formRecipient + " input[name*='nameRecipient']").parent().parent().hide();
                $(formRecipient + " input[name*='phoneRecipient']").parent().parent().hide();
                $(formRecipient + " input[name*='emailRecipient']").parent().parent().hide();
              } else {
                updateCookie('myself', 'no'); 
                $(".tn-elem__3333387561626430632839 a").attr('href', '#!/tab/333363861-4');
                $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-4');
                $('.tn-elem__3333387561626440005102').show();
                $(formRecipient + " input[name*='nameRecipient']").parent().parent().show();
                $(formRecipient + " input[name*='phoneRecipient']").parent().parent().show();
                $(formRecipient + " input[name*='emailRecipient']").parent().parent().show();
              };
          }); 
            
             $(formGiftText + " input[name*='anonim']").change(function() {                  
                  if (this.checked) {
                     $(formGiftText + " input[name*='fromGift']").parent().parent().hide();
                     updateCookie('anonim', 'yes');                        
                  } else {
                     $(formGiftText + " input[name*='fromGift']").parent().parent().show();
                     updateCookie('anonim', 'no');
                  }
              });   

              const $gift_date_field = $(formGiftText + " input[name*='datere']");
              const $gift_time_field = $(formGiftText + " input[name*='timere']"); 
   
             $(formGiftText + " input[name*='nowsend']").change(function() {                  
               if (this.checked) {
                  // console.log('nowsend change yes'); 
                  $gift_date_field.parent().parent().hide();
                  $gift_time_field.parent().parent().hide();                
                  updateCookie('nowsend', 'yes');
                } else {
                  // console.log('nowsend change no'); 
                  $gift_date_field.parent().parent().show();
                  $gift_time_field.parent().parent().show();                
                  updateCookie('nowsend', 'no'); 
               }
             });   
              
               if(order.datere == ''){                    
                  $gift_date_field.attr('value', c.currentDay ).data('value', c.currentDay );                     
                  updateCookie('datere', c.currentDay); 
               }else{                  
                  $gift_date_field.attr('value', order.datere ).data('value', order.datere );
               }  

               if(order.timere == ''){   
                  $gift_time_field.val(c.currentTime).attr( 'value', c.currentTime );
                  updateCookie('timere', c.currentTime);                     
               }else{
                  $gift_time_field.attr('value', order.timere ).data('value', order.timere );
               };  

                     $gift_date_field.pickadate({
                        min: 0,
                        max: 180,
                        yearSelector: false,
                        format: 'dd mmmm, ddd',
                        today: '',
                        onStart: function() { 
                           $gift_date_field.addClass('t-input_bbonly'); 
                        },
                        onSet: function(context){  
                           updateCookie('datere', context.select);                                                               
                        }
                     });              

                     $gift_time_field.pickatime({
                        format: 'HH:i',
                        formatLabel: 'HH:i',
                        formatSubmit: 'HH:i',
                        interval: 60,
                        min: [11,0],
                        max: [23,0],
                        onStart: function() { 
                           $gift_time_field.addClass('t-input_bbonly');                                  
                        },
                        onSet: function(context) {                   
                           updateCookie('timere', context.select);
                        }
                     });      
                     
                     // Получатель это покупатель  

                     if(order.myself == 'yes'){ 
                      $(formRecipient + " input[name*='myself']").prop('checked', true); 
                      $(".tn-elem__3333387561626430632839 a").attr('href', '#!/tab/333363861-5');
                      $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-3');
                      $('.tn-elem__3333387561626440005102').hide();
                      $(formRecipient + " input[name*='nameRecipient']").parent().parent().hide();
                      $(formRecipient + " input[name*='phoneRecipient']").parent().parent().hide();
                      $(formRecipient + " input[name*='emailRecipient']").parent().parent().hide();
                     };
                 
                        // Обновляем вид карты из куки 
                  
                  if(order.gift == 'digital'){
                     checkDigital.show( "fast", function() {
                        pixDigital.show();
                     });
                     checkOffline.hide();            
                     pixOffline.hide();          
                  
                  }else{
                     checkOffline.show( "fast", function() {
                        pixOffline.show();
                     });
                     pixDigital.hide();
                     checkDigital.hide(); 
                  }

                  // Обновляем дизайн карты из куки 

                  if(order.design == 'green'){
                     checkGreen.show( "fast", function() {
                        pixGreen.show();
                     });
                     checkBlack.hide();            
                     pixBlack.hide();
                     
                  }else{
                     checkBlack.show( "fast", function() {
                        pixBlack.show();
                     });
                     pixGreen.hide();
                     checkGreen.hide();     
                  };

                  // Обновляем формы из куки 

                  if(order.anonim == 'yes'){
                     $(formGiftText + " input[name*='anonim']").prop('checked', true);
                     $(formGiftText + " input[name*='fromGift']").parent().parent().hide();
                  }else{
                     $(formGiftText + " input[name*='anonim']").prop('checked', false);
                     $(formGiftText + " input[name*='fromGift']").parent().parent().show();
                  };

                  if(order.nowsend == 'yes'){
                     $(formGiftText + " input[name*='nowsend']").prop('checked', true);
                     $gift_date_field.parent().parent().hide();
                     $gift_time_field.parent().parent().hide();
                  }else{
                     $(formGiftText + " input[name*='nowsend']").prop('checked', false);
                     $gift_date_field.parent().parent().show();
                     $gift_time_field.parent().parent().show(); 
                  };

                  const fields = Object.entries(order);
                 // console.log(order);
                  for (const [key, value] of fields) {
                  const forms = [formRecipient, formGiftText, formPayer]; 
                      for (const form of forms) {
                        if($(form + " input[name='" + key + "']").length && value !== ''){ 
                           // console.log('update on form - ' + form + '  field - ' + key + ' value - ' + value );
                            $(form + " input[name='" + key + "']").val( value ).attr( 'value', value);
                        };
                      };  
                      if(key == 'textGift'){
                        $(formGiftText + " textarea[name*='" + key + "']").val( value ).attr( 'value', value);
                      };
                  };

                  $('.tn-elem__3332162771627117911491').hide(); // loading div
            
         };

          $(window).resize(function(e){ 
            setTimeout(() => {   
               addRangeSlider(order.price);
               addGiftFields();              
            }, 500);  
          });        

         $(document).ajaxSuccess(function( ){              
            addRangeSlider(order.price);
            addGiftFields();      
         }); 

         $(window).scroll(function(){
            addRangeSlider(order.price);
            });

         

         // #rec333216277 - форма выбора вида серта/

         zoneDigital.click(function () {
            checkDigital.show( "fast", function() {
               pixDigital.show();
             });
            checkOffline.hide();            
            pixOffline.hide();  
            updateCookie('gift', 'digital');       
         });

         zoneOffline.click(function () {            
            checkOffline.show( "fast", function() {
               pixOffline.show();
             });
            pixDigital.hide();
            checkDigital.hide();  
            updateCookie('gift', 'offline'); 
         });


         // #rec333332759 - форма выбора дизайна серта
         zoneGreen.click(function () {
            checkGreen.show( "fast", function() {
               pixGreen.show();
             });
            checkBlack.hide();            
            pixBlack.hide();
            updateCookie('design', 'green');            
         });

         zoneBlack.click(function () {            
            checkBlack.show( "fast", function() {
               pixBlack.show();
             });
            pixGreen.hide();
            checkGreen.hide();
            updateCookie('design', 'black');               
         });

      // Отправка форм 

     $('#rec333338756 .tn-elem__3333387561626440005102').click(function () { 
         $(formRecipient).submit();         
      });

      $('#rec333346474 .tn-elem__3333464741626703560639').click(function () { 
         $(formGiftText).submit();         
      });  
     
      
      $('form').each(function () {         
            $(this).submit(function(e) {
               if($(this).attr('id') !== cartId.slice(1) ) {               
                e.preventDefault();                                
                if($(this).attr('id') == formRecipient.slice(1) && order.nameRecipient !== '') {
                  $(formGiftText + " input[name*='who']").attr('value', order.nameRecipient ).data('value', order.nameRecipient );
                };

                if($(this).attr('id') == formGiftText.slice(1) && order.fromGift !== '' ) {
                  $(formPayer + " input[name*='name']").attr('value', order.fromGift ).data('value', order.fromGift );
                };               
            
            }else{
               coo.deleteCookie('orderGift');
               // console.log('cartId done');
              // console.log(order);
                //  console.log('goooo'); 
               }      
            });             
      });
 
      // Событие успешной отправки формы в Zero блоке /
      
      window.t396_onSuccess = function($form) {  
          
         const fields = $form.serializeArray(); 
         
        // console.log(fields);

         let $formId = '';
          
         for(const field of fields){  
            if(field.name == 'tildaspec-formid'){
               $formId = '#' + field.value; 
               };

            if(order[field.name] !== undefined){ 
                  updateCookie(field.name, field.value);
               };           
          };      

         if( $formId !== formPayer){

         let recipientNextButton = '';
         let fakeRecipientFormSubmit = '';
         
         switch ($formId) {
            case formRecipient:
               recipientNextButton = $('.tn-elem__3333387561626430632839 a');
               fakeRecipientFormSubmit = $('.tn-elem__3333387561626440005102');                              
            break;

            case formGiftText:
               recipientNextButton = $('.tn-elem__3333464741626703560630 a');
               fakeRecipientFormSubmit = $('.tn-elem__3333464741626703560639'); 
               
               $(formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(order.price);
                if ( !$(formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper label').length ){ 
                  $(formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc').after('<label></label>'); 
                }; 

              //  console.log(order); 
                    
            break;
         
            default:
            break;
         }; 

         for(const field of fields){ 
           
            if(order[field.name] !== undefined){   
               setTimeout(() => {
                  $($formId + " input[name*='" + field.name + "']").val( field.value ).attr( 'value', field.value);
               }, 500);           
            };        
            if(field.name == 'nameRecipient'){
               updateCookie('who', field.value);
            };
            if(field.name == 'fromGift'){
               updateCookie('namePayer', field.value);
            };
            
            if(field.name == 'textGift'){
               $("textarea[name*='" + field.name + "']").val( field.value ).attr( 'value', field.value);
              }
          }; 

         // fakeRecipientFormSubmit.hide();
         
         $('body').addClass('t-body_nolocked');          
         $(".t-form-success-popup")[0].click();
         setTimeout(() => {
               $('body').removeClass('t-body_scroll-locked');  
               $('body').removeClass('t-body_nolocked'); 
          }, 500);    

         recipientNextButton.click(); 
         
            }else{
               // console.log('formPayer submit');
               setTimeout(() => {                     
                      fillCart(function(){  
                      //  console.log('formPayer done');
                      //  console.log(order);  
                        $(cartId).submit();                          
                      });                      
                }, 500);

            };     
      };
   });

   */