import * as coo from './../cookie/cookie'
import * as c from './gConst'
import * as f from './gFunctions'

const adminID = coo.getCookie('adminID');


if($('#allrecords').attr('data-tilda-page-id') == '20195027'){  // https://borclub.ru/gift

   $('.formloader').hide();

  if(coo.getCookie('orderGift', true) == undefined){
    coo.setCookie('orderGift', c.emptyOrder, {expires: Date(1), domain: 'borclub.ru'});     
  };

  let order = coo.getCookie('orderGift', true);

  if(order== undefined){
      order = c.emptyOrder;     
   };

  const updateCookie = (name, value) =>{ // перезаписывает новые данные заказа в куках
    order[name] = value;
    coo.deleteCookie('orderGift');
    coo.setCookie('orderGift', order, {expires: Date(1), domain: 'borclub.ru'});    
  }

  const fillCart = (fn) => {      // добавляет сертификат в корзину, обновляет общую стоимость, заполняем форму
    const totalPrice =  order.price + order.priceDelivery; 
    let price = order.price;   
    window.tcart.total = totalPrice;
    window.tcart.prodamount = totalPrice;
    window.tcart.amount = totalPrice;  
    window.tcart.products.push({ 
       name: 'Gift',
       amount: price,
       price: price,
       quantity: 1
      }); 
    if(order.address !== '' && order.priceDelivery !== 0 && order.getGift == 'delivery'){ 
      updateCookie('gift', 'offline');
      window.tcart.products.push({ 
         name: 'Delivery=1', 
         amount: order.priceDelivery,
         price: order.priceDelivery,
         quantity: 1
       }); 
     };      
    window.tcart.system = order.devMode !== '1' ? 'sberbank' : 'banktransfer';

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

   const devMode = f.getUrlParameter('dev') == 1? '1' : '0';
   updateCookie('devMode', devMode);

   console.log(order.devMode);

   const cleanDelivery = () => { 
      $('.tn-elem__3878267691638791643562').hide();
      $('.tn-elem__3878267691638791606123').hide();
      $('.tn-elem__3333660931639417959593').hide();
      order.priceDelivery = 0;
      order.address = ''; 
   };

   cleanDelivery();

   if(order.devMode !== '1'){  $(c.cartId + " input[name='paymentsystem'][value='sberbank']").prop('checked', true);  }else{
      $(c.cartId + " input[name='paymentsystem'][value='banktransfer']").prop('checked', true);
   };
   

const mapInit = ($f) => {

   let multiRoute;
   let onceCheck = false;

   $('#map').html('');
   $('.tn-elem__3878267691639051171968').hide();
            
   let map = new ymaps.Map('map', {
         center: [59.938,30.3],
         zoom: 9,
         controls: []
     }),

   borPlacemark = new ymaps.Placemark([59.965678, 30.288874], {
             
        }, {
              iconLayout: 'default#image',
              iconImageHref: 'https://snazzy-maps-cdn.azureedge.net/assets/marker-43ad614e-415b-4fa7-8575-90edd86144a2.svg',
              iconImageSize: [48, 63],
              iconImageOffset: [-24, -63]
        });

   map.geoObjects.add(borPlacemark);

   const clearMap = () =>{
      map.geoObjects.remove(multiRoute).add(borPlacemark);
      map.panTo([59.965678, 30.288874], { delay: 2500, flying: true }); 
   }

   clearMap();

   let suggestView = new ymaps.SuggestView('address', {      
      provider: {
         suggest:(function(request){                               
            return ymaps.suggest("Санкт-Петербург, " + request);     
               })}
   });

   const checkPrice = () => {
      clearMap();
      $('.formloader').show(); 
      const value = c.inputAddress.value;        
         if(value !== '' && value !== undefined){           
            f.geocode(value, function($data){
              if($data.status){ 
               $('.tn-elem__3878267691638791643562').show();
                     if($data.price){  
                        $('.tn-elem__3878267691638791643562').hide();
                        $('.tn-elem__3878267691638791606123').hide();
                        $('.tn-elem__3878267691638791643562 .tn-atom').text('Стоимость доставки');  
                        order.address = value; 
                        order.geo_lat = $data.geo_lat;   
                        order.geo_lon = $data.geo_lon;                
                        c.inputAddress.val('').attr('value', '').attr('placeholder', order.address.replace('Россия, ', '').replace('Санкт-Петербург, ', '')); 
                        c.inputAddress.blur();
                        if($data.house !== null && $data.street_with_type !== null ){ 
                           order.priceDelivery = Math.round($data.price) + 50;
                           $('.tn-elem__3878267691638791606123 .tn-atom').text(f.delimiter(order.priceDelivery) + ' руб.'); 
                           $('.tn-elem__3878267691638791606123').show();
                           $('.tn-elem__3878267691639051171968').show();
                        }else{
                           $('.tn-elem__3878267691638791606123').hide();
                           $('.tn-elem__3878267691638791643562 .tn-atom').text('Уточните адрес для корректной доставки');
                           c.inputAddress.addClass('error-field');
                        }; 
                        $('.tn-elem__3878267691638791643562').show();
                        multiRoute = new ymaps.multiRouter.MultiRoute({
                           referencePoints: [
                              [c.fromGeoLat, c.fromGeoLon],
                              order.address
                           ],
                           params: {
                              results: 1
                           }
                        }, {
                              wayPointStartIconLayout: "default#image",
                              wayPointStartIconImageHref: 'https://snazzy-maps-cdn.azureedge.net/assets/marker-43ad614e-415b-4fa7-8575-90edd86144a2.svg',
                              wayPointStartIconImageSize: [48, 63],
                              wayPointStartIconImageOffset: [-25, -56],
                              routeActiveStrokeWidth: 6,
                              routeActiveStrokeColor: "#bfc997",
                              wayPointFinishIconFillColor: "#bfc997",
                              boundsAutoApply: true
                        });
                         map.geoObjects.remove(borPlacemark).add(multiRoute);                                                       
                     }else{
                        clearMap();
                        $('.tn-elem__3878267691638791643562').show();
                        $('.tn-elem__3878267691638791643562 .tn-atom').text('Не удалось определить стоимость. Попробуйте еще раз.');
                     };
               }else{
                  clearMap();
                  $('.tn-elem__3878267691638791643562').show();
                  $('.tn-elem__3878267691638791643562 .tn-atom').text('Не удалось определить стоимость. Попробуйте еще раз.');
               };
              setTimeout(function(){ $('.formloader').hide(); }, 300);           
            });               
          }else{  
            clearMap();
            $('.tn-elem__3878267691638791606123').show();
            $('.tn-elem__3878267691638791643562 .tn-atom').text('Не удалось определить стоимость. Попробуйте еще раз.'); 
            $('.formloader').hide(); 
         };   
   }
   
   suggestView.state.events.add('change', function () {
        let activeIndex = suggestView.state.get('activeIndex');
        if (typeof activeIndex == 'number') {
              const activeItem = suggestView.state.get('items')[activeIndex];                 
            if (activeItem && activeItem.value != c.inputAddress.value) {
              c.inputAddress.value = activeItem.value;  
              onceCheck = true;     
            }
        }
       }); 

       $('#rec387826769').on('focus',"#address",function(){
         const address = order.address !== undefined ? order.address.replace('Россия, ', '').replace('Санкт-Петербург, ', ''): '';
         c.inputAddress.val(address).attr('value', address);
         c.inputAddress.removeClass('error-field');
         const len = c.inputAddress.val().length;
         // c.inputAddress[0].focusout();
         c.inputAddress[0].setSelectionRange(len, len);
       });

       $('#rec387826769').on('focusout',"#address",function(){
         const address = order.address !== undefined ? order.address.replace('Россия, ', '').replace('Санкт-Петербург, ', ''): '';
         c.inputAddress.attr('placeholder', address);   
       });
       
       $('#rec387826769').on('change',"#address",function(){      
         if(onceCheck){
            checkPrice();
            onceCheck = false;
         };
       });

       $('#rec387826769').bind("touchstart", function(){  
         if(onceCheck){
            checkPrice();
            onceCheck = false;
         };
       });

       $f && $f();  
  };


   

   if(window.location.hash.includes('#!/tab/333363861')){     
      setTimeout(function () {
         $('.formloader').show();
         $("#rec333363861 .t397__tab:eq(0)")[0].click();
    }, 500);
    //  $("a[href$='#!/tab/333363861-1']").click();      // прыгаем на первый слайд формы   
     
      if(adminID == '198934435'){  
       //  $('.tn-elem__3288066801638792323223 a').click(); // детали доставки
       //  $('.tn-elem__3288066801639051483155 a').click(); // доставка или самовывоз
      }else{
         $(c.formPayer + " input[name='priceDelivery']").parent().parent().hide();
      }; 
   };

   $('a').on('click', function(){
      const href = $(this).attr('href');
      if(href.includes('#order:bookspa')){   
         $('.formloader').show();  
         document.location.href = "https://borclub.ru/bani#rec195683814";
      };
   }); 


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

   
   const addRangeSlider = (price = 0) => {   
      
      price = price == 0 ? $(c.formPrice + " input[name='inputRange']").attr('placeholder')  :  price;
                  
      /* Добавляем сумму и символ рубля в форму данных плательщика */

      const priceDelivery = price + order.priceDelivery ;

      price = f.delimiter( price ); 

      const oldPrice = Number($(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text().replace(/\s+/g, ''));
      if(oldPrice !== priceDelivery){
         $(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(f.delimiter(priceDelivery));
       }; 

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
            const price = Number(this.value) + Number(order.priceDelivery);
            $(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(f.delimiter(price + '')); 
         });            

         $(c.formPrice).addClass('ajax-success');

         $(c.formPrice + " input[name='inputRange']").bind("change keyup input click", function() {
            if (this.value.match(/[^0-9]/g)) {
               this.value = this.value.replace(/[^0-9]/g, '');
            };
         }); 

         $(c.formPrice + " input[name='inputRange']").on('change', function() {
            refreshPrice(this.value);
          });    

         };           
   };    

   const addGiftFields = () => { 

   // $(c.formGiftText + " input[name='nowsend']").parent().parent().hide(); // временно пока не сделаем

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

        $("#rec333346474").on("change keyup input click", "input[name*='anonim']", function() {
         if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
         };
      }); 

        const $gift_date_field = $("#rec333346474 input[name*='datere']");
        const $gift_date_field_submit = $("#rec333346474 input[name*='datere_submit']");
        const $gift_time_field = $("#rec333346474 input[name*='timere']"); 


        $(c.formGiftText).on('change keyup input click',"textarea[name='textGift']",function(){                
            f.limitText(this, 90);
       });   

       $(c.formGiftText).on('change keyup input click',"input[name*='who']",function(){                
         f.limitText(this, 20);
       });   

       $(c.formGiftText).on('change keyup input click',"input[name*='fromGift']",function(){                
         f.limitText(this, 20);
       });  
        
               
            $gift_date_field.attr('value', c.currentDay ).data('value', c.currentDay );                     
            $gift_time_field.attr( 'value', c.nextHour ).val(c.nextHour);


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
                      const $gift_date_field_submit = $("#rec333346474 input[name*='datere_submit']");
                     updateCookie('datere', $gift_date_field_submit.val() ); 
                     updateCookie('datere_submit', $gift_date_field_submit.val() );
                      console.log(order);    
                                                                             
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
                     updateCookie('timere', $gift_time_field.data('value') );
                   //  console.log(order); 
                  }
               });      
               $($gift_time_field).addClass('load-done');
               
              };


                  /* Обновляем вид карты из куки */
            
                  if(order.gift == 'digital'){
                     c.checkDigital.show( "fast", function() {
                        c.pixDigital.show();
                     });
                     c.giftNextButton.attr('href', '#!/tab/333363861-2');
                     c.checkOffline.hide();            
                     c.pixOffline.hide();  
                     $('.tn-elem__3333660931628063300813').hide();  // информация о доставке
                     $('.tn-elem__3333660931628064053416').hide();
                     $('.tn-elem__3333660931628064069415').hide();
                     updateCookie('priceDelivery', 0); 
                     updateCookie('address', '');    
                     updateCookie('getGift', 'pickup');
                  }else{
                     c.checkOffline.show( "fast", function() {
                        c.pixOffline.show();
                     });
                     c.pixDigital.hide();
                     c.checkDigital.hide(); 
                     updateCookie('myself', 'yes');  
                     c.giftNextButton.attr('href', '#!/tab/333363861-7');
                   //  $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-1');
                  }

                /* Обновляем способ получения */
            
                if(order.getGift == 'pickup' || order.getGift == undefined ){
                  c.checkDelivery.hide("fast"); 
                  c.getNextButton.attr('href', '#!/tab/333363861-5');
                  c.backPayerButton.attr('href', '#!/tab/333363861-7');
                  if(order.gift !== 'digital'){ $('.tn-elem__3333660931628063300813').show(); };

               }

               if(order.getGift == 'delivery'){
                  c.checkPickup.hide("fast");
                  c.getNextButton.attr('href', '#!/tab/333363861-6');
                  c.backPayerButton.attr('href', '#!/tab/333363861-6');
                  $('.tn-elem__3333660931628063300813').hide();  
               }

            
               /* Получатель это покупатель  */

               if(order.myself == 'yes'){ 
                $(c.formRecipient + " input[name*='myself']").prop('checked', true); 
                $('.tn-elem__3333387561626440005102').hide();
                $(c.formRecipient + " input[name*='nameRecipient']").parent().parent().hide();
                $(c.formRecipient + " input[name*='phoneRecipient']").parent().parent().hide();
                $(c.formRecipient + " input[name*='emailRecipient']").parent().parent().hide();
                $(".tn-elem__3333387561626430632839 a").attr('href', '#!/tab/333363861-5');
                if(order.gift == 'digital'){
                  $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-3');
                };
               };

               if(order.gift == 'digital'){
                  if(order.fromGift !== ''){ $(c.formPayer + " input[name='namePayer']").val( order.fromGift ).attr( 'value', order.fromGift ); }; 
               }else{ 
                  if(order.nameDeliveryRecipient !== ''){ $(c.formPayer+ " input[name='namePayer']").val( order.nameDeliveryRecipient ).attr( 'value', order.nameDeliveryRecipient); }; 
                  if(order.phoneDeliveryRecipient !== ''){  $(c.formPayer + " input[name='phonePayer']").val( order.phoneDeliveryRecipient ).attr( 'value', order.phoneDeliveryRecipient );}; 
               };
           

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

   setTimeout(() => {   
      addRangeSlider(order.price);
      addGiftFields(); 
   }, 1000);  

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

    const refreshhCookie = () => {
      coo.deleteCookie('orderGift'); 
      coo.setCookie('orderGift', c.emptyOrder, {expires: Date(1), domain: 'borclub.ru'});  
    };

     /* #rec389763134 - форма выбора способа получения */        

   
   c.zonePickup.click(function () {
      refreshhCookie();
      c.checkPickup.show("fast");
      c.checkDelivery.hide("fast"); 
      c.getNextButton.attr('href', '#!/tab/333363861-5');
      c.backPayerButton.attr('href', '#!/tab/333363861-7');
      $('.tn-elem__3333660931628063300813').show();  
      updateCookie('getGift', 'pickup');       
   });


   c.zoneDelivery.click(function () { 
      refreshhCookie();           
      c.checkPickup.hide("fast");
      c.checkDelivery.show("fast"); 
      c.getNextButton.attr('href', '#!/tab/333363861-6');
      c.backPayerButton.attr('href', '#!/tab/333363861-6');
      $('.tn-elem__3333660931628063300813').hide();  
      updateCookie('getGift', 'delivery');   
   });

   

   /* #rec333216277 - форма выбора вида серта */        


   c.zoneDigital.click(function () {
      refreshhCookie(); 
      c.checkDigital.show( "fast", function() {
         c.pixDigital.show();
       });
      c.giftNextButton.attr('href', '#!/tab/333363861-2');
      $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-4');
      c.checkOffline.hide();            
      c.pixOffline.hide();  
      $('.tn-elem__3333660931628063300813').hide();  
      $('.tn-elem__3333660931628064053416').hide(); 
      $('.tn-elem__3333660931628064069415').hide();
      updateCookie('gift', 'digital');  
      updateCookie('priceDelivery', 0); 
      updateCookie('address', '');    
      updateCookie('getGift', 'pickup');
   });


   c.zoneOffline.click(function () { 
      refreshhCookie();           
      c.checkOffline.show( "fast", function() {
         c.pixOffline.show();
       });
      $(".tn-elem__3333660931625571917544 a").attr('href', '#!/tab/333363861-1');
      c.giftNextButton.attr('href', '#!/tab/333363861-7');
   //   console.log(c.giftNextButton.attr('href')); 
      c.pixDigital.hide();
      c.checkDigital.hide();  
      $('.tn-elem__3333660931628063300813').show();  
      $('.tn-elem__3333660931628064053416').show();
      $('.tn-elem__3333660931628064069415').show();
      updateCookie('myself', 'yes');
      updateCookie('gift', 'offline'); 
     // console.log(c.toPayerScreenButton.attr('href'));
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

    //   $(".t397__tab:eq(1)")[0].click();
   //   console.log(order);  



   if(href.includes('333363861')){
      const slide = Number(href.slice(-1)) - 1; 
      $("#rec333363861 .t397__tab:eq(" + slide + ")")[0].click(); 
   };

      switch (href) {
         case '#!/tab/333363861-3':
            $('.formloader').show();
            setTimeout(() => {                  
               addGiftFields();  
               $('.formloader').hide();            
            }, 500);                        
         break;

         case '#!/tab/333363861-7':
            c.backPayerButton.attr('href', '#!/tab/333363861-7');                     
         break;

         case '#!/tab/333363861-6':
            console.log(order); 
            if(order.priceDelivery == 0 || order.priceDelivery == undefined){ 
               $('.formloader').show();
               ymaps.ready(mapInit(function(){ 
                  setTimeout(() => {   
                     $('.formloader').hide();            
                  }, 500);  
               })); 
             };
         break;

         case '#!/tab/333363861-4':
            $('.formloader').show();
            setTimeout(() => {                  
               addGiftFields();         
               $('.formloader').hide();     
            }, 500);
         break;

         case '#!/tab/333363861-5':  
               $('.formloader').show();
               addGiftFields(); 
               setTimeout(() => {   
                  let totalPrice = order.price;
                  let backPage;
                  if(order.gift == 'digital'){ 
                     backPage = order.myself == 'yes' ? 3 : 4; 
                   }else{
                     if(order.getGift == 'delivery'){ 
                        $(c.formPayer + " .t-input-group_fr .t-input-title").html(`Итоговая стоимость <br>(в т.ч. стоимость доставки - ${f.delimiter(order.priceDelivery)} руб.)`);
                        totalPrice += order.priceDelivery;
                        $('.tn-elem__3333660931639417959593').show();
                        backPage = 6;
                      }else{
                        $(c.formPayer + " .t-input-group_fr .t-input-title").html(`Итоговая стоимость`); 
                        backPage = 7;
                      }; 
                   };
                 //  console.log('back - ' + backPage);
                   c.backPayerButton.attr('href', '#!/tab/333363861-' + backPage ); 
                  // console.log(c.backPayerButton.attr('href'));
                  const oldPrice = Number($(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text().replace(/\s+/g, ''));
                  if(oldPrice !== totalPrice){
                     $(c.formPayer + " .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc").text(f.delimiter(totalPrice));
                   }; 
                   
                  if ( !$(c.formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper label').length ){ 
                     $(c.formPayer + ' .t-input-group_fr .t-input-block .t-calc__wrapper .t-calc').after('<label></label>'); 
                  };  
                  $('.formloader').hide();  
               }, 100);   
               
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

   if(empty){ 
      
    //  $(c.formRecipient).submit(); 
      $(c.formRecipient + ' .t-submit').click(); 
   
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
     // console.log(order); 
      nextButton.click(); 
   };      
           
});

$('#rec333346474 .tn-elem__3333464741626703560639').click(function () { 
   const nextButton = $('.tn-elem__3333464741626703560630 a');
   let empty = false; 

   if($(c.formGiftText + " input[name='who']").val() == ''){ empty = true; }; 
   if($(c.formGiftText + " input[name='fromGift']").val() == '' && order.anonim == 'no'){ empty = true; };

   if(empty){ 
     // $(c.formGiftText).submit();   
      $(c.formGiftText + ' .t-submit').click(); 
   }else{
      const fields = Object.entries(order);
      for (const [key, value] of fields) { 
         const field = $(c.formGiftText + " input[name='" + key + "']");          
         if(field.length && field.val() !== value && key !== 'nowsend' && key !== 'anonim' ){              
            updateCookie(key, field.val());     
          //  if(key == 'datere'){ updateCookie(key, $gift_date_field_submit.val()); };     
         };  
      };    
      setTimeout(() => {
         $(c.formPayer + " input[name='namePayer']").attr('value', order.fromGift ).data('value', order.fromGift ); 
      }, 500);   
      updateCookie('textGift', $(c.formGiftText + " textarea[name='textGift']").val() );        
      updateCookie('namePayer', order.fromGift );       
     // console.log(order); 
       nextButton.click(); 
      
   };          
});  

$('#rec387826769 .tn-elem__3878267691639389692763').click(function(){ 
   if(order.address == undefined || order.address == ''){
      c.inputAddress.addClass('error-field');
   }else{ 
      let empty = false; 
      const nameDeliveryRecipientInput = $(c.formDelivery + " input[name='nameDeliveryRecipient']");
      const phoneDeliveryRecipientInput = $(c.formDelivery + " input[name='phoneDeliveryRecipient']");
      const deliveryDescriptionTextArea = $(c.formDelivery + " textarea[name='deliveryDescription']");
      if(nameDeliveryRecipientInput.val() == ''){ empty = true; };
      if(phoneDeliveryRecipientInput.val() == ''){ empty = true; };
      if(empty){ 
       //  $(c.formDelivery).submit();   
         $(c.formDelivery + ' .t-submit').click(); 
      }else{
         order.nameDeliveryRecipient = nameDeliveryRecipientInput.val() 
         order.phoneDeliveryRecipient = phoneDeliveryRecipientInput.val(); 
         order.deliveryDescription = deliveryDescriptionTextArea.val(); 
         if(order.namePayer == ''){ updateCookie('namePayer', order.nameDeliveryRecipient);  }; 
         if(order.phonePayer == ''){ updateCookie('phonePayer', order.phoneDeliveryRecipient); }; 
         
         $('#rec387826769 .tn-elem__3878267691626703560630 a').click(); 
      };  
   };
});


$('#rec333366093 .tn-elem__3333660931627989962217').click(function () { 
   
   let empty = false; 

   if($(c.formPayer + " input[name='namePayer']").val() == ''){ empty = true; };
   if($(c.formPayer + " input[name='phonePayer']").val() == ''){ empty = true; };
   if($(c.formPayer + " input[name='emailPayer']").val() == ''){ empty = true; };

   if(order.getGift == 'delivery' && order.priceDelivery == 0){ 
      $("#rec333363861 .t397__tab:eq(0)")[0].click();
   };

   if(empty){ 
     // $(c.formPayer).submit();   
     $(c.formPayer + ' .t-submit').click();
   }else{
      const fields = Object.entries(order);
      for (const [key, value] of fields) { 
         const field = $(c.formPayer + " input[name='" + key + "']");          
         if(field.length && field.val() !== value){              
            updateCookie(key, field.val());         
         };  
      }; 
         if(order.address !== '' && order.priceDelivery !== 0){ 
            updateCookie('gift', 'offline');
         }; 
      setTimeout(() => {      
         $('.formloader').show();               
            fillCart(function(){  
               // $(c.cartId).submit();    
                $(c.cartId + ' .t-submit').click();                      
            });                      
      }, 500);
   };          
});  



/*
     
$(c.cartId).submit(function(e) {         
         coo.deleteCookie('orderGift');       
      });             
*/


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