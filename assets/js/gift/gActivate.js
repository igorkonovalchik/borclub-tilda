import * as coo from './../cookie/cookie'
import * as c from './gConst'
import * as f from './gFunctions'

const adminID = coo.getCookie('adminID');

console.log('admin ' + adminID);

if($('#allrecords').attr('data-tilda-page-id') == '21028842'){  // https://borclub.ru/gift/activate

  $(document).ready(function(){  

    $('#rec283013101 .t135').hide();

    const fillActivateData = (data, fn) => {

      c.giftActivateRec.addClass('activate');

      c.nameDiv.text('сертификат успешно');
      $('.tn-elem__3395970881627292855661 .tn-atom').text('активирован');
      $('.tn-elem__3395970881627292937714 .tn-atom').html(`
      ${f.truncate(data.who, 15)}, все готово! <br>
      Свяжитесь с нами чтобы запланировать Ваше посещение в Б.О.Р 812
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

          order.code = '0';

          if(order.activate == 'yes'){
            fillActivateData(order);
          }else{ 
            if(order.myself == 'yes'){
              c.nameDiv.hide();
              order.phoneActivate = '';
            }else{
              c.nameDiv.text(f.truncate(order.who, 20) + ',');
              order.phoneActivate = order.phoneRecipient;
              c.textGiftDiv.html(''); 
              if(order.textGift !== ' ' && order.textGift !== '' && order.textGift !== undefined && order.textGift !== null && order.textGift !== 'null'){  
                c.textGiftDiv.html('<p>&laquo;' + f.truncate(order.textGift, 90) + '&raquo;</p>'); }else{
                c.textGiftDiv.html('<p>&laquo;Будьте здоровы!&raquo;</p>');
              }; 
              if(order.fromGift !== null && order.fromGift !== ''){ 
                c.textGiftDiv.append('<p><span>' + order.fromGift + '</span></p>');
               };  
            }; 
          };

          if(order.design == 'black'){ 
            $('#rec362404452').addClass('dark'); 
            c.giftActivateRec.addClass('dark'); 
            c.pixBlackLogoBor.hide();            
          }else{           
            c.pixGreenLogoBor.hide();    
          }; 
          
          c.cardDiv.text(order.card);
          c.priceDiv.text(f.delimiter(order.price));
          $('.tn-elem__3395970881627293285462 .card .front .number').text(order.card);
          
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

          /* Убираем фишку с активацией  */

          if(adminID !== '198934435'){

            c.activateButton.hide();
            c.callButton.show();
            c.waButton.show();

         }else{
          $('.tn-elem__3395970881627293399461 .tn-atom').html(`
          Обязательно активируйте сертификат перед посещением клуба.
        `);  
         };

           /* Убираем фишку с активацией  */

          fn && fn();

    };

    

    let order = {}; 

    $('.tn-elem__3624044521633084972584 .tn-atom').html(
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

          c.activateScreen.click(); 

        });

        if(order.phoneActivate !== ''){ 
          $('.tn-elem__3614063071633076805796').addClass('active');         
        }; 

        const formPhones = () => {

       /* Форма ввода телефона для авторизации */
           if(order.phoneActivate !== ''){
            $("#form361406307 input[name='phoneActivate']").val(order.phoneActivate);
           }; 

            $("#form361406307 input[name='phoneActivate']").on('change', function(){             
              let newPhone = $("#form361406307 input[name='phoneActivate']").val();
              newPhone = newPhone.replace(/[^\d]/g, "");          
              if(order.phoneActivate !== newPhone){   
                order.phoneActivate = newPhone;            
                    if(order.phoneActivate !== ''){ 
                      $('.tn-elem__3614063071633076805796').addClass('active');
                      c.codeScreen.click();
                  }else{
                      $('.tn-elem__3614063071633076805796').removeClass('active');
                    };
              };
            });   

            /* Форма ввода кода подтверждения */

            $('.tn-elem__3614150731633076897333').click(function() {
              $("#form361415073 .t-input-group_ph").removeClass('js-error-control-box');
              $("#form361415073 .t-input-group_ph").addClass('js-error-control-box');
                              $('.tn-elem__3614150731633199323986').addClass('show');
                              $('.tn-elem__3614150731633199323980').addClass('show');
                                  setTimeout(function () {
                                    $('.tn-elem__3614150731633199323986').removeClass('show');
                                    $('.tn-elem__3614150731633199323980').removeClass('show');
                                  }, 5000);
            });

            

            $("#form361415073 input[name='codeActivate']").bind("change keyup input click", function() {
              let newCode = $("#form361415073 input[name='codeActivate']").val();
              $('.tn-elem__3614150731633076897333').addClass('active');
              if(newCode.length > 4){ $(this).val(newCode.substr(0, 4)); }; 
              if (newCode.match(/[^0-9]/g)) {
                this.value = newCode.replace(/[^0-9]/g, '');
               };
              if(newCode.length >= 4 && order.code !== newCode){                 
                  order.code = newCode;            
                      if(order.code !== ''){ 
                        c.loaderDiv.show();  
                        f.phoneAuth({operation: 'compareCode', data: {phone: order.phoneActivate, code: order.code } },       
                          function(data){ 
                            if(data.status == 'ok'){  
                              $("#form361415073 .t-input-group_ph").removeClass('js-error-control-box');
                              clearInterval(setInterval); 
                              c.pixGreenLogoBor.show();  
                               f.activateCard(order,       
                                  function(data){
                                    if(data == 'ok'){
                                      setTimeout(function () {           
                                        fillActivateData(order, function(){
                                          c.greenDesignButton.click(); 
                                          c.loaderDiv.hide();
                                        });
                                      }, 1500);   
                                    }else{
                                      c.numberDesignButton.click(); 
                                      c.loaderDiv.hide();
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

                            }else{
                              c.loaderDiv.hide();
                              $("#form361415073 .t-input-group_ph").addClass('js-error-control-box');
                              $('.tn-elem__3614150731633199323986').addClass('show');
                              $('.tn-elem__3614150731633199323980').addClass('show');
                                  setTimeout(function () {
                                    $('.tn-elem__3614150731633199323986').removeClass('show');
                                    $('.tn-elem__3614150731633199323980').removeClass('show');
                                  }, 5000);
                            };
                          });   
                        
                      }else{
                        $('.tn-elem__3614063071633076805796').removeClass('active');
                      }; 
              };
           }); 
        };

      $(document).ajaxSuccess(function( ){            
          formPhones();
      }); 

      /* Кнопки в форме ввода кода  */

      /* Таймер активация  */

      let intervals = 0;
      const timerButton = $('.tn-elem__3614150731632861752608 .tn-atom');
      const timeLimitSeconds = 46; 
      const titleCodeScreen = $('.tn-elem__3614150731632861654188 .tn-atom');

      const makeTimer = (start) => {
        let now = new Date();
        now = (Date.parse(now) / 1000);
        const timeLeft = now - start;
        const seconds = timeLimitSeconds - timeLeft;
        let messege = 'Отправить еще раз'; 
        if(seconds > 0){
          messege = 'Отправим через ' + seconds + ' секунд'; 
        }else{
          clearInterval(intervals);
          titleCodeScreen.text('Отправляем код...');
          f.phoneAuth({operation: 'setCode', data: { phone: order.phoneActivate } },       
          function(data){ 
            if(data.status !== 'ok'){   
              c.activateScreen.click();      
            };
            setTimeout(() => {  
              titleCodeScreen.text('Мы отправили код подтверждения на номер ' + order.phoneActivate);
              $('.tn-elem__3614150731632861752608').removeClass('disable');     
           }, 1500);   
           }); 
        };
        timerButton.text(messege);
      };

      timerButton.click(function() {
        if(!$('.tn-elem__3614150731632861752608').hasClass('disable')){
          f.phoneAuth({operation: 'setCode', data: { phone: order.phoneActivate } },       
          function(data){ 
            if(data.status == 'limit'){   
              $('.tn-elem__3614150731632861752608').addClass('disable'); 
              let start = new Date();
              start = (Date.parse(start) / 1000);
              intervals = setInterval(function() { makeTimer(start); }, 1000);
            }else{
              setTimeout(() => {  
                $("#form361415073 input[name='codeActivate']").focus();
                titleCodeScreen.text('Мы отправили код подтверждения на номер ' + order.phoneActivate); 
             }, 500); 
            };
            if(data.status !== 'ok' && data.status !== 'limit'){   
              c.activateScreen.click();      
            };
            c.loaderDiv.hide(); 
           }); 
        }else{ 
          c.loaderDiv.hide(); 
        };
      });

      /* Кнопка не приходит смс */

      let setInterval = 0;

      $(function () {
        $('a').click(function() {
           const href =  $(this).attr('href');       
           switch (href) {
              case '#!/tab/339963509-5': // запрос кода подтверждения
              $("#form361415073 input[name='codeActivate']").val('');
              $("#form361415073 .t-input-group_ph").removeClass('js-error-control-box');
              $('.tn-elem__3614150731633076897333').removeClass('active');
              timerButton.click(); 
              c.loaderDiv.show();  
              setInterval = setTimeout(() => {  // простой более 2 минут закрывает сессию
                c.activateScreen.click();
             }, 120000);                 
              break;  
              case '#!/tab/339963509-4':
                c.loaderDiv.show();   
                 setTimeout(() => {  
                    if(!$('.tn-elem__3614150731632861752608').hasClass('disable')){
                      $('.tn-elem__3614150731632861654188 .tn-atom').text('Отправляем код...'); 
                    };
                    c.loaderDiv.hide();           
                 }, 500);                        
              break;            
     
              default:            
     
              break;
           }
        });
     });

    /*  $(document).on('change', "#form361406307 input[name='phoneActivate]", function () {
        console.log('phoneActivate change');
        console.log($("#form361406307 input[name='phoneActivate']").val());
      }); */

        

  });

};