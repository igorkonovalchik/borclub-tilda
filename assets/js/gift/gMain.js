import * as coo from './../cookie/cookie'
import * as c from './gConst'
import * as f from './gFunctions'

if($('#allrecords').attr('data-tilda-page-id') == '20195027'){  // https://borclub.ru/gift

   $('.formloader').hide();

  if(coo.getCookie('orderGift', true) == undefined){
    coo.setCookie('orderGift', c.emptyOrder, {expires: Date(1), domain: 'borclub.ru'});     
  };

  let order = coo.getCookie('orderGift', true);

  const updateCookie = (name, value) =>{ // перезаписывает новые данные заказа в куках
    order[name] = value;
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
       if($(c.cartId + " input[name='" + key + "']").length && value !== ''){ 
           $(c.cartId + " input[name='" + key + "']").val( value ).attr( 'value', value);           
        };          
    };
    $(c.cartId + " input[name='Email']").val( order.emailPayer ).attr( 'value', order.emailPayer );
    $(c.cartId + " input[name='name']").val( order.namePayer ).attr( 'value', order.namePayer );
    $(c.cartId + " input[name='phone']").val( order.phonePayer ).attr( 'value', order.phonePayer );
   // console.log(window.tcart);  
   // console.log(order); 
    fn && fn();
 };


 const refreshPrice = (newPrice) => {
  newPrice = '' + newPrice;
  let id = 0;
  let spa = '';
  newPrice = Number(newPrice.replace(/\s/g, ''));
  newPrice = newPrice > Number(c.maxPrice) ? c.maxPrice : newPrice < Number(c.minPrice) ? c.minPrice : newPrice; 

  if( Number($('#sliderRange').val()) !== newPrice){
    $('#sliderRange').val(newPrice).change();                  
   }; 
   
  if( Number($("[name='inputRange']").val()) !== newPrice || $("[name='inputRange']").val() == ''){  
    $("[name='inputRange']").attr("value", f.delimiter( newPrice + '' )).val( f.delimiter( newPrice + '' ) );       
   }; 

   if($('.gift').length){

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

  };

   updateCookie('price', Number(newPrice)); 
  
};



$(document).ready(function(){  
   
   

   $(c.cartId + " input[name='paymentsystem'][value='sberbank']").prop('checked', true);   
   

   if(window.location.hash.includes('#!/tab/333363861')){     
      setTimeout(function () {
         $('.formloader').show();
    }, 500);
      $('.tn-elem__3333327591625571917544 a').click();      // прыгаем на первый слайд формы    
   };

   const width = document.documentElement.clientWidth; 

   if (width < 768) {

    setTimeout(function () {
        $('.tn-elem__3261126931625484766521 .card').toggleClass('flipped');
   }, 3000);

   }else {
      $(".tn-elem__3261126931623396735580").appendTo(".envelope .front .mailme");
      $(".tn-elem__3261126931623694773277").appendTo(".envelope .front .mailme");
      $(".tn-elem__3261126931623694690969").appendTo(".envelope .front .mailme");
      $('.tn-elem__3261126931623406992169').prependTo('.tn-elem__3261126931623311386607 .container');
      $('.tn-elem__3261126931623397020735').prependTo('.tn-elem__3261126931623311386607 .container');
      $('.tn-elem__3261126931623745252270').appendTo('.tn-elem__3261126931623311386607 .container');

      setTimeout(() =>
         {
            const video = document.getElementById('bgVideo');           
            video.pause();
            video.currentTime = 0;
            video.load();
            // video.play();
           //  video.trigger('play'); 
           
         }, 6000);
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
      
      price = price == 0 ? f.delimiter( $(c.formPrice + " input[name='inputRange']").attr('placeholder') ) : f.delimiter( price );
                  
      /* Добавляем сумму и символ рубля в форму данных плательщика */

      $(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(price);
      if ( !$(c.formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper label').length ){ 
         $(c.formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc').after('<label></label>'); 
      };  

      /* Добавляем слайдер выбора номинала */
         
      if(!$(c.formPrice).hasClass('ajax-success')){              
         
         refreshPrice(price);                
         
         $(c.formPrice + " input[name='inputRange']").attr( 'placeholder', price );   
         $(c.formPrice + " input[name='inputRange']").after('<label></label>');                                        

         if(!$(c.formPrice + " .rangeslider-box").length ){  
            $(c.formPrice + "  .t-input-group_in").after(
            `
            <div class="t-input-group rangeslider-box">
                  <input id="sliderRange" type="range" min="${c.minPrice}" max="${c.maxPrice}" step="${c.stepPrice}" value="${price.replace(/\s/g, '')}">
                  <div class="description-range">
                  <div class="min">${f.delimiter(c.minPrice)}</div>
                  <div class="max">${f.delimiter(c.maxPrice)}</div>
                  </div>
            </div>
            `           ); }; 

         $('#sliderRange')
         .rangeslider({
            polyfill: false
         }).on('input', function() {    
            refreshPrice(this.value);
            $(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(f.delimiter(this.value + '')); 
         });            

         $(c.formPrice).addClass('ajax-success');

         $(c.formPrice + " input[name='inputRange']").bind("change keyup input click", function() {
            if (this.value.match(/[^0-9]/g)) {
               this.value = this.value.replace(/[^0-9]/g, '');
            };
         }); 

         $(c.formPrice + " input[name='inputRange']").on('change', function() {
            refreshPrice(this.value);
            $(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(f.delimiter(this.value + '')); 
          });    

         };           
   };    

   const addGiftFields = () => { 

    $(c.formGiftText + " input[name='nowsend']").parent().parent().hide(); // временно пока не сделаем
          

    $('#rec333338756').on('change',"input[name='myself']",function(){             
        if (this.checked) {           
          $(".tn-elem__3333387561626430632839 a").attr('href', '#!/tab/333363861-5');
          $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-3');
          $('.tn-elem__3333387561626440005102').hide();
          $("#rec333338756 input[name='nameRecipient']").parent().parent().hide();
          $("#rec333338756 input[name='phoneRecipient']").parent().parent().hide();
          $("#rec333338756 input[name='emailRecipient']").parent().parent().hide();
          updateCookie('myself', 'yes');          
        } else {         
          $(".tn-elem__3333387561626430632839 a").attr('href', '#!/tab/333363861-4');
          $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-4');
          $('.tn-elem__3333387561626440005102').show();
          $("#rec333338756 input[name='nameRecipient']").parent().parent().show();
          $("#rec333338756 input[name='phoneRecipient']").parent().parent().show();
          $("#rec333338756 input[name='emailRecipient']").parent().parent().show();
          updateCookie('myself', 'no');           
        };
    }); 

    $('#rec333346474').on('change',"input[name*='anonim']",function(){                   
            if (this.checked) {
               $("#rec333346474 input[name*='fromGift']").parent().parent().hide();
               updateCookie('anonim', 'yes');                        
            } else {
               $("#rec333346474 input[name*='fromGift']").parent().parent().show();
               updateCookie('anonim', 'no');
            }
        });   

        const $gift_date_field = $("#rec333346474 input[name*='datere']");
        const $gift_time_field = $("#rec333346474 input[name*='timere']"); 

        $('#rec333346474').on('change',"input[name*='nowsend']",function(){                
         if (this.checked) {            
            $gift_date_field.parent().parent().hide();
            $gift_time_field.parent().parent().hide();                
            updateCookie('nowsend', 'yes');
          } else {            
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

         if(!$($gift_date_field).hasClass('load-done')){

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

               $($gift_date_field).addClass('load-done');
               
              };

              if(!$($gift_time_field).hasClass('load-done')){

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
               $($gift_time_field).addClass('load-done');
               
              };

               /* Получатель это покупатель  */

               if(order.myself == 'yes'){ 
                $(c.formRecipient + " input[name*='myself']").prop('checked', true); 
                $(".tn-elem__3333387561626430632839 a").attr('href', '#!/tab/333363861-5');
                $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-3');
                $('.tn-elem__3333387561626440005102').hide();
                $(c.formRecipient + " input[name*='nameRecipient']").parent().parent().hide();
                $(c.formRecipient + " input[name*='phoneRecipient']").parent().parent().hide();
                $(c.formRecipient + " input[name*='emailRecipient']").parent().parent().hide();
               };
           
                  /* Обновляем вид карты из куки */
            
            if(order.gift == 'digital'){
               c.checkDigital.show( "fast", function() {
                  c.pixDigital.show();
               });
               c.checkOffline.hide();            
               c.pixOffline.hide();  
               $('.tn-elem__3333660931628063300813').hide();  // информация о доставке
               $('.tn-elem__3333660931628064053416').hide();
               $('.tn-elem__3333660931628064069415').hide();
            
            }else{
               c.checkOffline.show( "fast", function() {
                  c.pixOffline.show();
               });
               c.pixDigital.hide();
               c.checkDigital.hide(); 
            }

            /* Обновляем дизайн карты из куки */


            if(order.design == 'green'){
               c.checkGreen.show( "fast", function() {
                  c.pixGreen.show();
                  c.pixGreenRecipient.show();
                  c.pixGreenText.show();
               });
               c.checkBlack.hide();            
               c.pixBlack.hide();
               c.pixBlackRecipient.hide(); 
               c.pixBlackText.hide();
               
            }else{
               c.checkBlack.show( "fast", function() {
                  c.pixBlack.show();
                  c.pixBlackRecipient.show();
                  c.pixBlackText.show();
               });
               c.pixGreen.hide();
               c.pixGreenRecipient.hide(); 
               c.pixGreenText.hide();
               c.checkGreen.hide();     
            };

            /* Обновляем формы из куки */ 

            if(order.anonim == 'yes'){
               $(c.formGiftText + " input[name*='anonim']").prop('checked', true);
               $(c.formGiftText + " input[name*='fromGift']").parent().parent().hide();
            }else{
               $(c.formGiftText + " input[name*='anonim']").prop('checked', false);
               $(c.formGiftText + " input[name*='fromGift']").parent().parent().show();
            };

            if(order.nowsend == 'yes'){
               $(c.formGiftText + " input[name*='nowsend']").prop('checked', true);
               $gift_date_field.parent().parent().hide();
               $gift_time_field.parent().parent().hide();
            }else{
               $(c.formGiftText + " input[name*='nowsend']").prop('checked', false);
               $gift_date_field.parent().parent().show();
               $gift_time_field.parent().parent().show(); 
            };

            const forms = [c.formRecipient, c.formGiftText, c.formPayer]; 
            for (const form of forms){
              if(!$(form).hasClass('fill-all-fields')){
                const fields = Object.entries(order);
                for (const [key, value] of fields){
                  if($(form + " input[name='" + key + "']").length && value !== ''){                      
                      $(form + " input[name='" + key + "']").val( value ).attr( 'value', value);
                  }; 
                  if(key == 'textGift' && $(form + " textarea[name*='" + key + "']").length && value !== ''){
                    $(form + " textarea[name*='" + key + "']").val( value ).attr( 'value', value);
                  };
                };  
               $(form).addClass('fill-all-fields');
              };                
            }; 

          $('.formloader').hide(); // loading div
      
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

      /*
   $('#rec333338756').load(c.formRecipient,function(){
         console.log('form load'); 
    });
    */

   

   /* #rec333216277 - форма выбора вида серта */        

   c.zoneDigital.click(function () {
      c.checkDigital.show( "fast", function() {
         c.pixDigital.show();
       });
      c.checkOffline.hide();            
      c.pixOffline.hide();  
      $('.tn-elem__3333660931628063300813').hide();  
      $('.tn-elem__3333660931628064053416').hide(); 
      $('.tn-elem__3333660931628064069415').hide();
      updateCookie('gift', 'digital');       
   });

   c.zoneOffline.click(function () {            
      c.checkOffline.show( "fast", function() {
         c.pixOffline.show();
       });
      c.pixDigital.hide();
      c.checkDigital.hide();  
      $('.tn-elem__3333660931628063300813').show();  
      $('.tn-elem__3333660931628064053416').show();
      $('.tn-elem__3333660931628064069415').show();
      updateCookie('gift', 'offline'); 
   });


   /* #rec333332759 - форма выбора дизайна серта */
   c.zoneGreen.click(function () {
      c.checkGreen.show( "fast", function() {
         c.pixGreen.show();
         c.pixGreenRecipient.show();
         c.pixGreenText.show();
       });
      c.checkBlack.hide();            
      c.pixBlack.hide();
      c.pixBlackRecipient.hide();
      c.pixBlackText.hide();
      updateCookie('design', 'green');            
   });

   c.zoneBlack.click(function () {            
      c.checkBlack.show( "fast", function() {
         c.pixBlack.show();
         c.pixBlackRecipient.show();
         c.pixBlackText.show();
       });
      c.pixGreen.hide();
      c.pixGreenRecipient.hide();
      c.pixGreenText.hide();
      c.checkGreen.hide();
      updateCookie('design', 'black');               
   });

/* прыг по табам */

$(function () {
   $('a').click(function() {
      const href =  $(this).attr('href'); 
       
      
      switch (href) {
         case '#!/tab/333363861-3':
            $('.formloader').show();
            setTimeout(() => {                  
               addGiftFields();  
               $('.formloader').hide();            
            }, 500);                        
         break;

         case '#!/tab/333363861-4':
            $('.formloader').show();
            setTimeout(() => {                  
               addGiftFields();         
               $('.formloader').hide();     
            }, 500);
         break;

         case '#!/tab/333363861-5':  
               setTimeout(() => {         
                  $(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(order.price);
                  if ( !$(c.formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper label').length ){ 
                     $(c.formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc').after('<label></label>'); 
                  };   
               }, 500);    
         break;

         default:            

         break;
      }
   });
});

/* Отправка форм */

$('#rec333338756 .tn-elem__3333387561626440005102').click(function () { 

   const nextButton = $('.tn-elem__3333387561626430632839 a');
   let empty = false; 

   if($(c.formRecipient + " input[name='nameRecipient']").val() == ''){ empty = true; };
   if($(c.formRecipient + " input[name='phoneRecipient']").val() == ''){ empty = true; };

   if(empty){ $(c.formRecipient).submit(); 
   
   }else{
      const fields = Object.entries(order);
      for (const [key, value] of fields) { 
         const field = $(c.formRecipient + " input[name='" + key + "']");          
         if(field.length && field.val() !== value && key !== 'myself'){              
            updateCookie(key, field.val());         
         };  
      }; 
      $(c.formGiftText + " input[name*='who']").attr('value', order.nameRecipient ).data('value', order.nameRecipient );   
      updateCookie('who', order.nameRecipient );          
      console.log(order); 
      nextButton.click(); 
   };      
           
});

$('#rec333346474 .tn-elem__3333464741626703560639').click(function () { 
   const nextButton = $('.tn-elem__3333464741626703560630 a');
   let empty = false; 

   if($(c.formGiftText + " input[name='who']").val() == ''){ empty = true; };

   if(empty){ 
      $(c.formGiftText).submit();   
   }else{
      const fields = Object.entries(order);
      for (const [key, value] of fields) { 
         const field = $(c.formGiftText + " input[name='" + key + "']");          
         if(field.length && field.val() !== value && key !== 'nowsend' && key !== 'anonim'){              
            updateCookie(key, field.val());         
         };  
      };      
      updateCookie('textGift', $(c.formGiftText + " textarea[name='textGift']").val() );     
      $(c.formPayer + " input[name*='name']").attr('value', order.fromGift ).data('value', order.fromGift );
      updateCookie('namePayer', order.fromGift );    
      console.log(order); 
      nextButton.click(); 
   };          
});  

$('#rec333366093 .tn-elem__3333660931627989962217').click(function () { 
   
   let empty = false; 

   if($(c.formPayer + " input[name='namePayer']").val() == ''){ empty = true; };
   if($(c.formPayer + " input[name='phonePayer']").val() == ''){ empty = true; };
   if($(c.formPayer + " input[name='emailPayer']").val() == ''){ empty = true; };

   if(empty){ 
      $(c.formPayer).submit();   
   }else{
      const fields = Object.entries(order);
      for (const [key, value] of fields) { 
         const field = $(c.formPayer + " input[name='" + key + "']");          
         if(field.length && field.val() !== value){              
            updateCookie(key, field.val());         
         };  
      };      
      console.log(order); 
   //  nextButton.click(); 
      setTimeout(() => {      
         $('.formloader').show();               
            fillCart(function(){  
            $(c.cartId).submit();                          
            });                      
      }, 500);
   };          
});  


     
$(c.cartId).submit(function(e) {         
         coo.deleteCookie('orderGift');       
      });             



/* Событие успешной отправки формы в Zero блоке */
/*
window.t396_onSuccess = function($form) {  
    
   const fields = $form.serializeArray(); 

   let $formId = '';
    
   for(const field of fields){  
      if(field.name == 'tildaspec-formid'){
         $formId = '#' + field.value; 
         };       
    };      

   for(const field of fields){ 
      // field.name
      // field.value           
    }; 

   // fakeRecipientFormSubmit.hide();
   
  // после отправки формы вылазает попапа который прячем а это все нужно чтобы разблокировать экран
   $('body').addClass('t-body_nolocked');          
   $(".t-form-success-popup")[0].click();
   setTimeout(() => {
         $('body').removeClass('t-body_scroll-locked');  
         $('body').removeClass('t-body_nolocked'); 
    }, 500);          
};
*/

});


};