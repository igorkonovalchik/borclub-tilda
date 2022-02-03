import * as c from './gConst'
import * as f from './gFunctions'

if($('#allrecords').attr('data-tilda-page-id') == '20957900'){  // https://borclub.ru/gift/thankyou

  $(document).ready(function(){  

    let order = {}; 

    let systranid = f.getUtmParameter('orderId');

    if(systranid !== undefined && systranid !== ''){
      
      f.getOrder({systranid: systranid, card: '', phoneRecipient: ''},       
      function(data){        
        if(data !== null){  
          order = data[0]; 

          let text = 'Спасибо за Ваш заказ. Оплата прошла успешно. <br>';

          switch (order.gift) {
            case 'digital':

              if(order.myself == 'yes'){
                text += 'Скоро Вам придет смс и email с ссылкой на подарочный сертификат. Вы можете воспользоваться им сами или подарить сертифкат близким отправив им эту ссылку. ';
              }else{
                text += 'Мы сообщим Вам когда получатель получит Ваш подарок.';
              };
              
            break;

            case 'offline':

              if(order.getGift == 'pickup'){
                text += 'Ждем Вас за сертификатом в Б.О.Р. 812';
              }else{
                text += 'Скоро мы отправим Ваш сертификат. Ожидайте смс уведомлений.';
              };
              
            break;

          };

          $('#rec338466542 .t338__descr').html(text);

        };
      }); 

    };

      
  });

};