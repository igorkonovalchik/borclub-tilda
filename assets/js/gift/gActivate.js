
import * as c from './gConst'
import * as f from './gFunctions'

if($('#allrecords').attr('data-tilda-page-id') == '21028842'){  // https://borclub.ru/gift/activate

  $(document).ready(function(){  

    $('#rec283013101 .t135').hide();

    const fillActivateData = (data, fn) => {

      c.giftActivateRec.addClass('activate');

      c.nameDiv.text('сертификат успешно');
      $('.tn-elem__3395970881627292855661 .tn-atom').text('активирован');
      $('.tn-elem__3395970881627292937714 .tn-atom').html(`
      ${f.truncate(data.who, 15)}, мы свяжемся с Вами в ближайшее время.<br>
       До встречи в загородном клубе Б.О.Р. 812.
      `);

      $('.tn-elem__3395970881627293399461 .tn-atom').html(`
      Хотите сделать такой же подарок? 
      <br>
      <a href="https://borclub.ru/gift" style="border-bottom: 1px solid rgb(0, 0, 0); box-shadow: none; text-decoration: none; color: rgb(0, 0, 0);">
      Оформить подарочную карту</a>
      `);      
 
      $('.tn-elem__3395970881627462775618 a').attr('href', 'https://api.whatsapp.com/send?phone=79991812812&text=' + encodeURIComponent('Здравствуйте. Подарочная карта - ' + data.card) ); 

      c.textGiftDiv.hide();
      c.activateButton.hide();
      c.callButton.show();
      c.waButton.show();

      fn && fn();

    };

    const fillData = (data, fn) => {
                 
          order = data[0]; 

        //  console.log(data[0]);

          if(order.activate == 'yes'){
            fillActivateData(order);
          }else{ 
            if(order.myself == 'yes'){
              c.nameDiv.hide();
            }else{
              c.nameDiv.text(f.truncate(order.who, 15) + ',');
            }; 
          };

          if(order.design == 'black'){ 
            c.giftActivateRec.addClass('dark'); 
            c.pixBlackLogoBor.hide();            
          }else{           
            c.pixGreenLogoBor.hide();    
          }; 
          
          c.cardDiv.text(order.card);
          c.priceDiv.text(f.delimiter(order.price));
          $('.tn-elem__3395970881627293285462 .card .front .number').text(order.card);

          c.textGiftDiv.html(''); 

          if(order.textGift !== ''){  c.textGiftDiv.html('<p>&laquo;' + f.truncate(order.textGift, 90) + '&raquo;</p>'); }; 
          
          if(order.anonim !== 'yes'){ 
              c.textGiftDiv.append('<p><span>' + order.fromGift + '</span></p>');
            };  

          if(order.myself == 'yes'){

            $('.tn-elem__3395970881627293399461 .tn-atom').html(`
            Хотите сделать такой же подарок? 
            <br>
            <a href="https://borclub.ru/gift" style="border-bottom: 1px solid rgb(0, 0, 0); box-shadow: none; text-decoration: none; color: rgb(0, 0, 0);">
            Оформить подарочную карту</a>
            `);      
       
            $('.tn-elem__3395970881627462775618 a').attr('href', 'https://api.whatsapp.com/send?phone=79991812812&text=' + encodeURIComponent('Здравствуйте. Подарочная карта - ' + order.card) );

            c.textGiftDiv.hide();
            c.activateButton.hide();
            c.callButton.show();
            c.waButton.show();

          };

          fn && fn();

    };

    

    let order = {}; 

    $('.tn-elem__3395970881627390913848 .tn-atom').html(
      `<div class="sp-wrap"><div class="sp-wave"></div></div>`
    ).addClass('loading');

    c.callButton.hide();
    c.waButton.hide();
    c.greenDesignButton.click(); 

    let orderid = f.getUtmParameter('orderid');
    let activate = f.getUtmParameter('activate');

   

    if(orderid !== undefined && orderid !== '' && orderid.match(/^\d+$/)){
      
      f.getOrder({orderid: orderid, card: '', phoneRecipient: ''},       
      function(data){        
        if(data !== null){  
          order = data;
          fillData(data);
        }else{ 
          c.numberDesignButton.click();
        };

          $('.tn-elem__3395970881627293285462 .card').on('click', function () {
              function explode() {
                $('.tn-elem__3395970881627293285462 .card ').toggleClass('flipped');
              }
              setTimeout(explode, 400);
          });

          setTimeout(function () {
                $('.tn-elem__3395970881627293285462 .card').toggleClass('flipped');
          }, 3000);

          setTimeout(function () {
            $('.tn-elem__3395970881627293285462 .card').toggleClass('flipped');
           }, 4700);

           if(activate !== undefined && activate == 'yes' && order.activate !== 'yes' ){
            c.activateButton.click();
          }else{
            c.loaderDiv.hide();
          };

      }); 

    }else{ 
      c.numberDesignButton.click(); 
    };

    /* Событие успешной отправки формы в Zero блоке */

      window.t396_onSuccess = function($form) {  
          
        const fields = $form.serializeArray(); 

        let card = ''; 
        let phoneRecipient = ''; 

        for(const field of fields){ 
          if(field.name == 'phoneRecipient'){ 
               phoneRecipient = field.value;
             };  
          if(field.name == 'card'){ 
            card = field.value;
           };          
        }; 
        
        f.getOrder({card: card, phoneRecipient: phoneRecipient},       
        function(data){ 
          if(data !== null){  
            order = data;
            fillData(data, function(){
              c.greenDesignButton.click();
              $('.tn-elem__3395970881627390913848').hide();
            });
          }else{ 
           // c.numberDesignButton.click();
           $('.tn-elem__3400425171627415158583').addClass('show');
           $('.tn-elem__3400425171627415200478').addClass('show');
              setTimeout(function () {
                $('.tn-elem__3400425171627415158583').removeClass('show');
                $('.tn-elem__3400425171627415200478').removeClass('show');
              }, 6000);
          };
         });
        };

        c.activateButton.on('click', function(){

          c.loaderDiv.show();   
          c.pixGreenLogoBor.show();  
           
          f.activateCard(order,       
            function(data){
              if(data == 'ok'){
                setTimeout(function () {           
                  fillActivateData(order, function(){
                    c.loaderDiv.hide();
                  });
                }, 1500);   
              }else{
                c.numberDesignButton.click(); 
                $('.tn-elem__3400425171627415200478').text('Возникла ошибка активации. Обратитесь к менеджеру.');
                $('.tn-elem__3400425171627415158583').addClass('show');
                $('.tn-elem__3400425171627415200478').addClass('show');
                setTimeout(function () {
                  $('.tn-elem__3400425171627415158583').removeClass('show');
                  $('.tn-elem__3400425171627415200478').removeClass('show');
                }, 5000);
              setTimeout(function () {
                $('.tn-elem__3400425171627415200478').text('Номер карты или телефон не найдены. Попробуйте еще раз.');
                $('.tn-elem__3400425171627415158583').removeClass('show');
                $('.tn-elem__3400425171627415200478').removeClass('show');
              }, 6000);

              }                        
             }); 
        });

        

  });

};