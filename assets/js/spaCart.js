
// Форма корзина на странице бань
    
const spas = require('./data/spadata')
import CountUp from './function/countUp.min'
import moment from '../../../plugins/moment/moment'
import getWeekDay from './function/getday'
import getTotalCost from './function/gettotalcost'
import getParams from './function/getParams'
import getDates from './yclients/getDates'
import * as c from './data/const.js'

const priceId = 'price' + c.popupSpa.slice(4);

const Cartrumoment = moment();
Cartrumoment.locale('ru');
let date = Cartrumoment.add(1,'days');             
const nextDay = date.format('YYYY/MM/DD'); 
const currentYear = Number(date.format('YYYY')); 
const currentMonth = Number(date.format('MM'));

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

const updatePrice = (id = -1, price = 0) => {
    if( id === -1 ){ id = 0; };  
    price = price !== 0 ? price : $price_field.val();
    window.tcart.total = price;
    window.tcart.prodamount = price;
    window.tcart.amount = price;    
   // console.log('spas[id].title - ' + spas[id].title);
  // Обновление корзины товаром (услугами) вынести в другую функцию
  // console.log('window.tcart.products[0].name - ' + window.tcart.products[0].name);
   /* window.tcart.products[0].name = spas[id].title;
    window.tcart.products[0].price = price;
    window.tcart.products[0].amount = price; */
  //  console.log(window.tcart);   
};

const changeEnableDays = (data, date = false) => {
    if(typeof data === 'object' && !Array.isArray(data)){
      console.log('load days from yclients');
      data = Object.values(data);
    }
    if(data === null ){ 
      console.log('data is null');
      return false;
    };
    if(data.length === 0 ){ 
      if(date){ console.log('all day in current and next month is free'); }else{ 
        console.log('all day in month is free');
      }
      return false;
    };
    const result = {};     
    if(date){
      let dateObj = new Date(date);
      const dateM = moment(dateObj); 
      for(let counter = 0; counter <= data.length - 1; counter++){ 
        if(counter > 0){ dateM.add(counter,'days'); };
        date = dateM.format('YYYY-MM-DD');
        if(!data.includes(date)){ result.select = dateM.format('YYYY/MM/DD'); break; };
       };  
    };    
    const fn = (acc, item) =>
      { 
        item = item.split('-');        
        acc.push(item.map((item, index) => {
          if(index === 1){ item = item - 1; }          
          return Number(item); }));
        return acc;
      };
    result.disable = data.reduce(fn, []);
    return result;
}

const timeTable = (data) => {  
  if(!Array.isArray(data) || data === null ){ 
    console.log('data is null');
    return false;
   };
   if(data.length === 0 ){ 
    console.log('all times is free')
    return false;
   };
  const result = {};  
  const min = Number(data[0].time.substr(0, 2));
  const index = data.length - 1;   
  const max = Number(data[index].time.substr(0, 2));
  const fulltimetable = [];
  let f = true;
  for (let counter = min; counter <= max; counter++) {    
    f = data.find(p => p.time === `${counter}:00`);
    if(f){ fulltimetable.push({'time': `${counter}:00`, 'is_free': true}); }else{
      fulltimetable.push({'time': `${counter}:00`, 'is_free': false});
    };
  };
  const concat = fulltimetable.concat(data);  
  const fullData = concat.reduce((m, o) => {
        const found = m.find(p => p.time === o.time);
        if (found) {
            found.is_free = o.is_free;        
        } else {
            m.push(o);
        }
        return m;
        }, []); 
  result.disable = fullData.filter((item) => !item.is_free).reduce((a, item) => a = [...a, Number(item.time.substr(0, 2)) ], []);
  result.enable = fullData.filter((item) => item.is_free).reduce((a, item) => a = [...a, Number(item.time.substr(0, 2)) ], []);
  result.min = [ min , 0 ];
  result.max = [ max , 0 ];
  const foundFirst = fullData.find(p => p.is_free === true);
  result.select = foundFirst ? Number(foundFirst.time.substr(0, 2)) * 60 : 900;  
  return result;
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
    if(total === -1 && id === -1 && date === 0 && time === 0){                        
       // $date_field.data('value', nextDay ); // .attr('value', date )
        $day_field.val(getWeekDay(nextDay));
       // $time_field.val(sec2time(900)).attr( 'value', 900 );
    }else{   
    let oldprice = $price_field.val();
    if(time === 0){ time = $time_field.attr( 'value' ); }else{ $time_field.val(sec2time(time)).attr( 'value', time ); };
    let day = $day_field.val();   
    if(date !== 0){  
               // $date_field.addClass('t-input_bbonly'); //.attr('value', date );
                day = getWeekDay(date);
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
    updatePrice(id, total);
    // getDates('times',id, nextDay); 
  }; 

};

$(document).ready(function(){ 

 // console.log(window.tcart);  

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

   
    const $d = $date_field.pickadate({
        min: 1,
        max: 180,
        yearSelector: false,
        format: 'dd mmmm, ddd',
        formatSubmit: 'yyyy/mm/dd',
        today: '',
        clear: '',
       // disable: [{ from: [2021,3,10], to: [2021,3,20] }, { from: [2021,3,2], to: [2021,3,4] }],
        onStart: function() {
            $date_field.addClass('t-input_bbonly'); //.data('value', nextDay ); // .attr('value', nextDay )
          }, 
        onSet: function(c){  
          if(c.select !== undefined){ 
            const date = moment(c.select).format("YYYY/MM/DD");
            $date_field.data('value', date );                	
            updateCart( -1, -1, c.select );
            };
          },
      /*  onChangeMonthYear: function(year,month,inst) {
          console.log('onChangeMonthYear action');
            console.log(year + month + inst); 
            // Perform AJAX call and get the list
            //override the array, and now the october dates will be disabled.
             array = ["2021-03-23","2021-03-25","2021-03-26"];
            }, 
        onOpen: function(data) {
              console.log('Opened up');
              console.log(data);
            },
            */
    });

    const datepicker = $d.pickadate('picker');
    
    const $t = $time_field.pickatime({
        format: 'HH:i',
        formatLabel: 'HH:i',
       // formatSubmit: 'HH:i',
        interval: 60,
        min: [11,0],
        max: [22,0],
        /*
        disable: [
          11, 12, 13
        ],
          formatLabel: function(time) {
          var hours = ( time.pick - this.get('now').pick ) / 60,
            label = hours < 0 ? ' !hours to now' : hours > 0 ? ' !hours from now' : 'now'
          return  'h:i a <sm!all>' + ( hours ? Math.abs(hours) : '' ) + label +'</sm!all>'
        }, */
        onStart: function() {  
            $time_field.addClass('t-input_bbonly'); // .val(sec2time(900)).attr( 'value', 900 );            
          },
        onSet: function(c) {            
            updateCart( -1, -1, 0, c.select );
          }
    });  
    
    const timepicker = $t.pickatime('picker');

   //  datepicker.set('disable', true);
    let loadMonth = {};

    loadingField();
    getDates('days', $id_field.val(), nextDay, (data) => { 
        console.log(data);
        const tt = changeEnableDays(data.data, nextDay);
        if(currentMonth === 12){ 
          loadMonth[currentYear] = [currentMonth - 1];
          loadMonth[currentYear + 1] = [0];
        }else{
          loadMonth[currentYear] = [currentMonth - 1, currentMonth];
        };
        console.log(loadMonth);
        console.log(tt);
        if(tt){ 
          datepicker.set('disable', tt.disable )                    
                    .set('select', tt.select, { format: 'yyyy/mm/dd' })
                     // .set('enable', ttDays.enable )
              };  
         updateCart();
         loadingField(false);
    }); 

    datepicker.on({
      render: function() { 
        // console.log('render');
      },
      set: function(c) {
          // console.log(c.highlight.month);
          // datepicker.set('disable', { from: [2021,c.highlight.month,10], to: [2021,c.highlight.month,20] });
        if(c.select !== undefined){
          let date = moment(c.select).format("YYYY/MM/DD");
          loadingField();
          timepicker.set('enable', true); 
          getDates('times',$id_field.val(), date, (data) => { 
            const tt = timeTable(data.data);
            if(tt){ 
            timepicker.set('disable', tt.disable)
                        .set('min', tt.min)
                        .set('max', tt.max)       
                        .set('select', tt.select)
                        .render();
                  };
              loadingField(false);
          }); 
        }else{
          if(c.highlight !== undefined){
            console.log(c.highlight.month);
            let year = c.highlight.year;
            let month = c.highlight.month + 2;
            if(month > 11){ month = month - 11; year = year + 1; };
            if(!loadMonth[year].includes(month)){
            let months = [...loadMonth[year], month];
            loadMonth[year] = months;
            console.log(loadMonth);
            month = month + 1;
           // console.log(c.highlight.obj.getMonth());
            getDates('days', $id_field.val(), year + '-' + month, (data) => { 
            const tt = changeEnableDays(data.data);
              if(tt){ 
                datepicker.set('disable', tt.disable )                          
                    };
            }); };
          }else{
           // console.log(c);
          };
        };
      }
    });

    $spa_field.change(function() {
        const id = $(c.popupSpa + " select[name*='spa'] option:selected").index();  
        loadMonth = {};   
        timepicker.set('enable', true);  
        datepicker.set('enable', true);
        loadingField();  

        getDates('changeSpa', id, $date_field.data('value'), (data) => { 
          console.log(data);
          const tt = changeEnableDays(data.data, $date_field.data('value'));
          if(currentMonth === 12){ 
            loadMonth[currentYear] = [currentMonth - 1];
            loadMonth[currentYear + 1] = [0];
          }else{
            loadMonth[currentYear] = [currentMonth - 1, currentMonth];
          };
          console.log(loadMonth);
          console.log(tt);
          if(tt){ 
            datepicker.set('disable', tt.disable )                    
                      .set('select', tt.select, { format: 'yyyy/mm/dd' })
                       // .set('enable', ttDays.enable )
                };  
           updateCart(-1, id ); 
           loadingField(false);
      }); 
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

  console.log('openspa');
    
    let href = $(this).attr('href');
    let param = getParams(href); 
    let id = param.spa === undefined || param.spa === NaN?$id_field.val():param.spa;   

    loadMonth = {};
    timepicker.set('enable', true);  
    datepicker.set('enable', true);

    loadingField();
    getDates('changeSpa', id, $date_field.data('value'), (data) => { 
        console.log(data);
        const tt = changeEnableDays(data.data, $date_field.data('value'));
        if(currentMonth === 12){ 
          loadMonth[currentYear] = [currentMonth - 1];
          loadMonth[currentYear + 1] = [0];
        }else{
          loadMonth[currentYear] = [currentMonth - 1, currentMonth];
        };
        console.log(loadMonth);
        console.log(tt);
        if(tt){ 
          datepicker.set('disable', tt.disable )                    
                    .set('select', tt.select, { format: 'yyyy/mm/dd' })
                     // .set('enable', ttDays.enable )
              };  
         updateCart(-1, id);
         loadingField(false);
    }); 
    

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
    

    loadMonth = {};
    timepicker.set('enable', true);  
    datepicker.set('enable', true);

    loadingField();
    getDates('changeSpa', id, $date_field.data('value'), (data) => { 
        console.log(data);
        const tt = changeEnableDays(data.data, $date_field.data('value'));
        if(currentMonth === 12){ 
          loadMonth[currentYear] = [currentMonth - 1];
          loadMonth[currentYear + 1] = [0];
        }else{
          loadMonth[currentYear] = [currentMonth - 1, currentMonth];
        };
        console.log(loadMonth);
        console.log(tt);
        if(tt){ 
          datepicker.set('disable', tt.disable )                    
                    .set('select', tt.select, { format: 'yyyy/mm/dd' })
                     // .set('enable', ttDays.enable )
              };  
         updateCart(-1, id);
         loadingField(false);
    });     

    updateCart(-1, id );

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
                   if(c.isSmall){  $("#rec196832202").css("position","relative");  };
                   $("#nav188296220").css("display","block");
        $("#rec238782757 .t450__burger_container").css("display","block");
            }
        });
    });

     /* Заполнение формы датой и временем на главной  */

     const $main_time_field = $(c.mainFormSpa + " input[name*='time']");
     const $main_date_field = $(c.mainFormSpa + " input[name*='date']");
     const $main_day_field = $(c.mainFormSpa + " input[name*='day']");
    // const $main_spa_field = $(c.mainFormSpa + " select[name*='spa']");

    if($(c.mainFormSpa).length && !c.isSmall ){ 

        $main_date_field.data('value', nextDay );
        $main_day_field.val(getWeekDay(nextDay));
        $main_time_field.val(sec2time(900)).attr( 'value', 900 );
        
		$main_date_field.pickadate({
                    min: 1,
                    yearSelector: false,
                    format: 'dd mmmm, ddd',
                   // formatSubmit: 'dd mmmm',
                    today: '',
                    onStart: function() {
                        $main_date_field.attr('value', date ); // .data('value', nextDay ); //   
                    },
                    onSet: function(context) {  
                        let myPicker = $date_field.pickadate('picker');
                        myPicker.set('select', context.select);
                    }
		});

		$main_time_field.pickatime({
                    format: 'HH:i',
                    formatLabel: 'HH:i',
                    // formatSubmit: 'HH:i',
                    interval: 60,
                    min: [11,0],
                    max: [22,0],
                    onStart: function() {  
                        $main_time_field.val(sec2time(900)).attr( 'value', 900 );            
                    },
                    onSet: function(c) {
                      updateCart(-1, -1, 0, c.select );               
                    }
                });

    /* Если форма на главной отправляется успешно то данные передаем в корзину для дальнейшего оформления */
      $(`#form${c.mainFormSpa.slice(4)}.js-form-proccess`).data('success-callback', 'window.openCart' );
  
      window.openCart = function ($form) {
  
          /* $form - jQuery объект ссылающийся на форму */   
          /* номер заявки (Lead ID) */
          // let formresult = $form.data('tildaformresult');
          // let leadid = formresult.tranid;
  
          /* все поля заявки в 
            let arr = {};
            $($form.serializeArray()).each(function(i, el) {
                arr[el.name] = el.value;
            });	
         */
        let id = $(c.mainFormSpa + " select[name*='spa'] option:selected").index();        
         updateCart(-1, id );  
         /* запускаем форму */
         $('a[href="#order:bookspa=1?sber=0"]').click().after(function(){
             /* прячем форму на главной */
            $(c.mainFormSpa).hide(); 
         });

        };
      };

    };

});

