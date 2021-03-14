
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
let currentSpaID = 0;


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
const $persons_field = $(c.popupSpa + " input[name*='persons']"); 
const $dopHour_field = $(c.popupSpa + " input[name*='dopHour']");
const $picker__table = $(c.popupSpa + " .picker__table");
const $picker__list = $(c.popupSpa + " .picker__list");
const $submit = $(c.popupSpa + " :submit");



const $email_field = $(c.popupSpa + " .t-input-group_em");
const $cash_field = $(c.popupSpa + " .t-input-group_pm .t-radio__control:first-child");
const $sber_field = $(c.popupSpa + " .t-input-group_pm .t-radio__control:last-child");

let easingFn = function (t, b, c, d) {
    let ts = (t /= d) * t;
    let tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
    }; 

const unique = (arr) => {
      return Array.from(new Set(arr));
    };

const getMax = (arr) => Math.max.apply(null, arr);

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

const getMonth = (date) => {
  let result = '';
  if(typeof date === 'object'){
    const entries = Object.entries(date);
    for(const [key, value] of entries) {
      value.forEach((item) => {
      	item = item + 1;
      	if(item < 10){ item = '0' + item; };
        result += key + '-' + item + ';';
      });
    };
    result = result.substring(0, result.length - 1);
  }else{
  date = new Date(date);
  const dateM = moment(date); 
  result = dateM.format('YYYY-MM');
};
  return result;
};

const updateServices = (data, time, fn) => {
  if(data === null || data.length === 0 ){ 
    console.log('Нет услуг для загрузки цен');    
    return false;
  };
  const id = $id_field.val();
  const date = $date_field.data('value');     
  let total = 0;
  let oldprice = $price_field.val() === NaN ? 0 : 0 + $price_field.val();     
  const $rentMinArr = data.sort(function(a, b) {
                            return Number(a.price_max) - Number(b.price_max);
                          });
   // .filter( (service) => service.seance_length > 3600 ) // только аренды без доп часов 
  console.log('Список доступных услуг');
  console.log($rentMinArr);
 
  if($rentMinArr.length !== 0){
      const $rentTimes = {};   
      $rentTimes.wm = $rentMinArr[0];                     
      if($rentMinArr.length > 2){        
        $rentTimes.we = $rentMinArr[1];
        $rentTimes.h = $rentMinArr[2];
        $rentTimes.ny = { ...$rentMinArr[2], 'price_max': $rentMinArr[2].price_max * 2 }; 
      }else{
              if($rentMinArr.length === 2){             
              $rentTimes.we = $rentMinArr[0];
              $rentTimes.h = $rentMinArr[1];
              $rentTimes.ny = { ...$rentMinArr[1], 'price_max': $rentMinArr[1].price_max * 2 }; 
                  }else{             
              $rentTimes.we = $rentMinArr[0];
              $rentTimes.h = $rentMinArr[0];
              $rentTimes.ny = { ...$rentMinArr[0], 'price_max': $rentMinArr[0].price_max * 2 }; 
            };
      }; 

      console.log('Перебрали список услуг');
      console.log($rentTimes);        
      const $rentMin = $rentTimes[getWeekDay(date, time)]; // Определяем к чему относится выбранные день
      console.log('Выбранный день  ' + getWeekDay(date, time));
      total = 0 + $rentMin.price_max * spas[id].minhours;
      $(c.popupSpa + ' .t706__form-upper-text').text( 'за ' + spas[id].minhours + ' до ' + spas[id].person  + ' гостей');
  }else{
    $(c.popupSpa + ' .t706__form-upper-text').text( 'Ошибка. Попробуйте позже.');
    total = 0;
  };

  $price_field.val(total); 
  const demo = new CountUp(priceId, oldprice, total, 0, 0.7, CountUpOptions);
  demo.start(); 
  updatePrice(id, total);
  fn && fn();
};

const changeDisableDays = (data, date = false) => {
    const result = {};  
    result.select = ''; 
    if(data === null || data.length === 0 ){ 
      console.log('All day in current and next month is free');
      result.select = date ? date : nextDay;
      console.log('Set current day - ' + result.select);
      result.disable = false;
      return result;
    };
    if(typeof data === 'object' && !Array.isArray(data)){
      console.log('load days from yclients');
      data = Object.values(data);
    };
     
    if(date){
      let dateObj = new Date(date);
      const dateM = moment(dateObj); 
      // console.log(dateM);
     // const max = data.length - data.indexOf(dateM.format('YYYY-MM-DD')) - 1;
      const max = 180;
      for(let counter = 0; counter <= max; counter++){ 
        if(counter > 0){ dateM.add(1,'days'); };
        date = dateM.format('YYYY-MM-DD');
        if(!data.includes(date)){ 
          result.select = dateM.format('YYYY/MM/DD');
          console.log('we have free day!!! it"s: ' + result.select );
          break;
         };
       };
      if(result.select === ''){ console.log('В ближайшие пол года доступных дат нет.'); }
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



const timeTable = (data = 0) => {  
  const result = {};  
  const id = $id_field.val();
  const minHours = spas[id].minhours; 
  const cleanHours = spas[id].cleanhours; 
  const totalTime = minHours + cleanHours;
  let concat = [];
  let records = [];
  const min = 11;
  const max = 23;
  const fulltimetable = [];
  for (let counter = min; counter <= max; counter++) {  
    fulltimetable.push({'time': `${counter}:00`, 'is_free': true});
  };  

  if(data === 0 || Array.isArray(data) || data === null || data.length === 0 ){

        console.log('Обновляем время по умолчанию');

        concat = fulltimetable; 
        
  }else{

        console.log('Обновляем время из даты');

        if(typeof data === 'object' && !Array.isArray(data)){
          console.log('records...');
          records = data.records !== null && data.records !== undefined && !Array.isArray(data.records) ? Object.values(JSON.parse(data.records)) : [];
          console.log('records ok');
          console.log('times...');
          data = data.times !== null && data.times !== undefined && !Array.isArray(data.times) ? Object.values(JSON.parse(data.times)[0]) : {};
          console.log('times ok');
        };

        concat = fulltimetable.concat(data); 
        
     /*   let f = true;
        for (let counter = 11; counter <= 23; counter++) {    
          f = data.find(p => p.time === `${counter}:00`);
          if(f){ fulltimetable.push({'time': `${counter}:00`, 'is_free': true}); }else{
            fulltimetable.push({'time': `${counter}:00`, 'is_free': false});
          };
        };  
      */
  };

 // console.log('data');
 // console.log(data[0]);

  console.log('records count');
  console.log(records.length);

  result.disable = concat
                .reduce((m, o) => {
                    const found = m.find(p => p.time === o.time);
                    if (found) {
                        found.is_free = o.is_free;        
                    } else {
                        m.push(o);
                    }
                    return m;
                    }, [])
                .filter((i) => i !== 0 && !i.is_free)
                .reduce((a, item) => a = item.time !== undefined ? [...a, Number(item.time.substr(0, 2)) ] : [ ...a ], [])
                .sort((a, b) => a - b );
  
  console.log('result.disable');
  console.log(result.disable);

  const disableTimes = [ ...result.disable ]; 

  let cleanDisable = [];
  let hour = 0;
  for(let i = min; i <= max; i++) { 
    hour = result.disable.includes(i) ? hour + 1 : 0;
    if(hour === minHours ){  
      for(let n = i; n <= i + cleanHours; n++) { 
        cleanDisable = [...cleanDisable, n ]; 
      };
    }; 
  };

  result.disable = unique( [ ...result.disable, ...cleanDisable ] );

  console.log('result.disable + cleanhour');
  console.log(result.disable);

  let newDisable = [];
  let once = false;

  if(id == 1 || id == 7 ){

    if(!result.disable.includes(11)){
      for(let i = 12; i < 17; i++) { 
        if(result.disable.includes(i)){ once = true; }; 
      }
    };
    if(once){ newDisable = [...newDisable, 11, 12, 13, 14, 15, 16, 17]; }; 

    once = false;
      if(!result.disable.includes(17)){
        for(let i = 18; i < 24; i++) { 
          if(result.disable.includes(i)){ once = true; }; 
        }
      }else{
        newDisable = [...newDisable, 12];
      };
    if(once){ newDisable = [...newDisable, 17, 18, 19, 20, 21, 22, 23]; };

  };

  if(id == 4 || id == 5 || id == 6 ){

      if(!result.disable.includes(11)){
        for(let i = 12; i < 15; i++) { 
          if(result.disable.includes(i)){ once = true; }; 
        }
      };
      if(once){ newDisable = [...newDisable, 11, 12, 13, 14, 15, 19]; }; 

      once = false;
      if(!result.disable.includes(15)){
        for(let i = 16; i < 19; i++) { 
          if(result.disable.includes(i)){ once = true; }; 
        }
      }else{
        newDisable = [...newDisable, 12];
      };
      if(once){ newDisable = [...newDisable, 15, 16, 17, 18, 19]; }; 

      once = false;
      if(!result.disable.includes(19)){
        for(let i = 20; i < 24; i++) { 
          if(result.disable.includes(i)){ once = true; }; 
        }
      }else{
        newDisable = [...newDisable, 12, 16];
      };
      if(once){ newDisable = [...newDisable, 19, 20, 21, 22, 23]; };

  };

  if(id == 2 ){

    let busy = 0;

    if(result.disable.includes(15)){
        for(let i = 11; i < 16; i++) { 
            if(result.disable.includes(i)){ once = true; }else{
              busy++;
            }; 
          }
        if(once){ 
          newDisable = [...newDisable, 11, 12, 13, 14, 15 ];
          for(let n = 15; n <= busy + 15; n++) { 
            newDisable = [...newDisable, n];
          };
        }; 
    };

    if(result.disable.includes(19)){
        busy = 3;
        once = false;
        for(let i = 16; i < 19; i++) { 
          if(result.disable.includes(i)){ once = true; }else{
            busy--;
          }; 
        };
        if(once){ 
          newDisable = [...newDisable, 16, 17, 18, 19];
          for(let n = 15; n >= 15 - busy; n--) { 
            newDisable = [...newDisable, n];
          };
        }; 
    };

  };

  console.log('newDisable');

  console.log(newDisable);

  result.disable = unique( [ ...result.disable, ...newDisable, ...spas[id].disableTime ] ).sort((a, b) => a - b ); 

  console.log('после чистки');

  console.log(result.disable);

  result.min = [ min , 0 ];
  result.max = [ max , 0 ];

  let firstTime = max; 
  for(let i = min; i <= max; i++) { 
    if(!result.disable.includes(i)){
      if($time_field.val().substr(0, 2) == i){ firstTime = i; break; }; 
      firstTime = firstTime > i ? i : firstTime; 
    };
  };
  result.select = firstTime !== max ? firstTime * 60 : 900;

  // Определяем количество часов, которые можно добавить 26 - это 2 ночи
  const fullTimeTable = [];
  for (let counter = min; counter <= 26; counter++) {  
    fullTimeTable.push(counter);
  };

  result.dopHours = fullTimeTable
      .filter((i) => i >= firstTime + totalTime)
      .filter((i) => !disableTimes.includes(i))
      .filter((i, c, ar) => i === firstTime + totalTime + c);

  return result;
};

const disableAllFields = (action = true) => {
  if(action){
    $submit.addClass('disable-input');
    $picker__table.addClass('disable-input');
    $picker__list.addClass('disable-input');
    $(c.popupSpa + ' input').each(function(){
      $(this).addClass('disable-input');
  });
  }else{
    $submit.removeClass('disable-input');
    $picker__table.removeClass('disable-input');
    $picker__list.removeClass('disable-input');
    $(c.popupSpa + ' input').each(function(){
      $(this).removeClass('disable-input');
  });
  }
};  


const loadingField = (start = true, fields = 'datetime') => {    
  if(start){
    $(c.popupSpa + " .picker").each(function(){
      $(this).addClass('loading');
    });
    if(fields === 'datetime'){ 
      $date_field.addClass('loading');
      $time_field.addClass('loading');
    }else{ 
      $(c.popupSpa + ' .t706__form-upper-text').addClass('loading');
    };    
  //  $('#' + priceId).addClass('loading');      
  }else{
    $(c.popupSpa + " .picker").each(function(){
      $(this).removeClass('loading');
    });
    if(fields === 'datetime'){
    $date_field.removeClass('loading');
    $time_field.removeClass('loading');
  }else{ 
    $(c.popupSpa + ' .t706__form-upper-text').removeClass('loading');
 //   $('#' + priceId).removeClass('loading');
    };  
  };
  disableAllFields(start);
};

const updateCart = (total = -1, id = -1, date = 0, time = 0) => {     
    if(total === -1 && id === -1 && date === 0 && time === 0){                        
     //   $date_field.data('value', nextDay ); // .attr('value', date )
     //   $day_field.val(getWeekDay(nextDay));
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
        currentSpaID = id;
        $id_field.val(currentSpaID);
        $(c.popupSpa + ' .t706__cartwin-heading').text( spas[id].title );        
        if($(c.popupSpa + " select[name*='spa'] option:selected").index() !== id){ $(c.popupSpa + " select[name*='spa']").prop('selectedIndex', id); }; 
    };     
   
  /*  if(total === -1){              
     total = getTotalCost(time, day, id);
    };
    $price_field.val(total); 
    const demo = new CountUp(priceId, oldprice, total, 0, 0.7, CountUpOptions);
    demo.start(); 
    updatePrice(id, total); */ 
    // getDates('times',id, nextDay); 
  }; 
};



$(document).ready(function(){ 


  $date_field.parent().parent().addClass('w50').addClass('datefield');
  $time_field.parent().parent().addClass('w50').addClass('timefield');

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
    $(c.popupSpa + " .t-input-group_nm").hide();
    $(c.popupSpa + " .t-input-group_ph").hide();
    $(c.popupSpa + " .t-input-group_cb").hide();
    $(c.popupSpa + " .t-input-group_pm").hide();
    $cash_field.hide();
    $id_field.val(currentSpaID);
    $price_field.val(0); 
    updateCart(); 

    $id_field.before(`
  <div class="t-input-group t-input-group_in counter">
  <div class="t-input-title t-descr t-descr_m"> Количество гостей </div>
  <div class="number">
    <span class="minus">-</span>
    <input id="personsInput" type="text" class="" value="0" disabled/>
    <span class="plus">+</span>
  </div>
  </div>
  <div class="t-input-group t-input-group_in counter minhour">
    <div class="t-input-title t-descr t-descr_m"> Добавить часы? </div>
  <div class="number">
    <span class="minus">-</span>
    <input id="dopHoursInput" type="text" class="" value="0" disabled/>
    <span class="plus">+</span>
  </div>
  </div>`);

  const $hours_counter = $(c.popupSpa + " #dopHoursInput"); 
  const $persons_counter = $(c.popupSpa + " #personsInput");

    $(document).on('click', '.minus', function () {
      const $input = $(this).parent().find('input');
      const id = $id_field.val();
      let count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      if($input.attr('id') === 'personsInput'){
        if( count >= spas[id].person){
          const oldprice = Number($price_field.val());
          const total = oldprice - 6000;
          $price_field.val(total); 
          const demo = new CountUp(priceId, oldprice, total, 0, 0.7, CountUpOptions);
          demo.start(); 
          updatePrice(id, total);
        }
      };
      return false;
    });

    $(document).on('click', '.plus', function () {
      const $input = $(this).parent().find('input');
      const id = $id_field.val();
      let count = parseInt($input.val()) + 1;
      if($input.attr('id') === 'personsInput'){
        const totalMax = spas[id].maxDopGuests + spas[id].person;
        if( count <= totalMax ){ 
            $input.val(count);  
            if( count > spas[id].person){
              const oldprice = Number($price_field.val());
              const total = oldprice + 6000;
              $price_field.val(total); 
              const demo = new CountUp(priceId, oldprice, total, 0, 0.7, CountUpOptions);
              demo.start(); 
              updatePrice(id, total);
            };
        };
      }else{
        $input.val(count);
      };
      $input.change();
      return false;
    });

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
              updateCart( -1, -1, c.select ); // Меняем день недели и обновляем счетчик цены
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

    $(c.popupSpa + " .picker .picker__wrap").each(function(){
        $(this).prepend('<div class="sp-wrap"><div class="sp-wave"></div></div>');
    });

    const datepicker = $d.pickadate('picker');
    const timepicker = $t.pickatime('picker');
    let loadMonth = {}; // накопитель количества месяцев загруженных для выбранной бани

    console.log(loadMonth);

    const updateFields = (id, lM, date ) => {

      loadingField();
      loadingField(true, 'titleprice');

      if(date === undefined){ date = nextDay; }; 

      $id_field.val(id); 

      $persons_counter.val(parseInt(spas[id].person / 2));

      loadingField();

      if(Object.keys(lM).length){

        timepicker.set('enable', true)
                   .set('disable', timeTable().disable); 
        datepicker.set('enable', true);
  
        console.log('Уже были загружены месяцы. Обновляем загрузку для +- 1 от выбранной даты');
  
        const curDate = new Date(date);
        const curdateM = moment(curDate); 
        const maxMonth = Number(curdateM.format('MM')) + 1;
        const minMonth = maxMonth - 2;
    
        const curYear = Number(curdateM.format('YYYY'));
        const newObj = {};
    
        newObj[curYear] = lM[curYear].filter((m) => m <= maxMonth && m >= minMonth );
        lM = newObj;
  
        console.log('А именно: ');
        console.log(lM[curYear]);
  
      }else{
        console.log('Первая загрузка данных! Грузим: ' + nextDay);
        $date_field.data('value', nextDay );
        $day_field.val(getWeekDay(nextDay));
        lM = nextDay;
      };     

    getDates('days', id, getMonth(lM), 0, (data) => { 
        console.log('Получаем ответ');
        console.log(data);
        lM = {}; 
        const tt = changeDisableDays(data.days, date);
        lM = data.months;
        console.log('Пишем данные в lM -');
        console.log(lM);
        console.log('Преобразуем данные для загрузки в поля');
        console.log(tt);
        if(tt.disable){  datepicker.set('disable', tt.disable ); };
        if(tt.select !== '' && tt.select !== undefined){
          console.log('Дата выбора ' + tt.select + ' установлена');
          datepicker.set('select', tt.select, { format: 'yyyy/mm/dd' });
          loadingField(false);
        }else{
          console.log('Даты выбора в загруженных месяцах нет ставим текущую дату и морозим поля ');
          $date_field.data('value', nextDay );
        //loadingField(false);
          loadingField();
        };
        loadMonth = lM;
        updateCart(-1, id);
        });   
    };  

    timepicker.on({
      render: function() { 
         // console.log('render');
      },
      open: function() {
        console.log('Открыт список времени! Обновляем ');
          loadingField();
          timepicker.set('enable', true)
                    .set('disable', timeTable().disable); 
          getDates('times', $id_field.val(), $date_field.data('value'), 0, (data) => { 
            console.log('Часы получены успешны: ');
            console.log(data);
            const tt = timeTable(data);
            console.log('Преобразуем для загрузки часов в поля: ');
            console.log(tt);
            if(tt){ 
              timepicker.set('disable', tt.disable); 
              
            };
            console.log('Обновляем часы');
            loadingField(false);
          });
      },
      set: function(c) {
        if(c.select !== undefined){
          console.log('Время изменили. Меняем стоимость! ');
          console.log('Запрос в базу с данными: spaID - ' + $id_field.val() + ' date -' + $date_field.data('value') + ' time -' + c.select);
          loadingField(true, 'titleprice');
          getDates('services', $id_field.val(), $date_field.data('value'), c.select, (data) => {                   
            updateServices(data, c.select, () =>{
              loadingField(false, 'titleprice');
            });            
          });
        };
      }
    });
    
    
    datepicker.on({
      render: function() { 
        // console.log('render');
      },
      open: function() {
            console.log('Открыт слайдер! Обновляем загруженные ранее месяцы! ');
            loadingField();
            datepicker.set('enable', true);
            console.log(loadMonth);
            loadingField();
            getDates('days', $id_field.val(), getMonth(loadMonth), 0, (data) => { 
                const tt = changeDisableDays(data.days);
                if(tt){ 
                  console.log('Успех! Обновили!');
                  datepicker.set('disable', tt.disable);
                };
                loadingField(false);
            });    
      },
      set: function(c) {
        const id = $id_field.val();
        // datepicker.set('disable', { from: [2021,c.highlight.month,10], to: [2021,c.highlight.month,20] });
        if(c.select !== undefined){ // change date event
          console.log('День изменен. Загружаем занятые часы'); 
          let date = moment(c.select).format("YYYY/MM/DD");
          $date_field.data('value', date ).attr('value', date );
          console.log($date_field.data('value'));
          loadingField();
          timepicker.set('enable', true)
                    .set('disable', timeTable().disable); 
          getDates('times', id, date, 0, (data) => { 
            console.log('Часы получены успешны: ');
            console.log(data);
            const tt = timeTable(data);
            console.log('Преобразуем для загрузки часов в поля: ');
            console.log(tt);
            if(tt){ 
            timepicker.set('disable', tt.disable)
                        .set('min', tt.min)
                        .set('max', tt.max)       
                        .set('select', tt.select)
                  };
            
            console.log('Обновляем часы');
            loadingField(false);
          }); 
        }else{
          if(c.highlight !== undefined && c.highlight.month !== undefined){ // change slide calendar event
            console.log('Слайдер календаря переключен. Данные - ');
            let year = c.highlight.year;
            let month = c.highlight.month;
            console.log('Год - ' +  year  + ' Месяц - ' + month );
            console.log('Проверяем в загруженных есть ли в массиве или является последним загруженным месяцем');
            console.log(loadMonth);
            if(!loadMonth[year].includes(month) || month === getMax(loadMonth[year])){
            console.log('Грузим! Получаем месяц - ' + year + '-' + month);
            loadingField();
            getDates('days', id, year + '-' + month, 0, (data) => { 
            const tt = changeDisableDays(data.days);
              if(tt){ 
                datepicker.set('disable', tt.disable ); 
                for(const year in data.months) {
                  loadMonth[year] = [...loadMonth[year], data.months[year]].flat().filter((v, i, a) => a.indexOf(v) === i);
                };
                console.log('Добавляем новые месяцы в loadMonth. Получаем: ');
                console.log(loadMonth);       
                  };
                  loadingField(false);
            }); }else{ console.log(month + ' уже есть и не последний'); };
          }else{
           // console.log(c);
          };
        };
      }
    });

    $spa_field.change(function() {
        
        const id = $(c.popupSpa + " select[name*='spa'] option:selected").index(); 
        updateFields( id, loadMonth, $date_field.data('value')); 

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
        console.log('закрываем корзину');
        console.log($date_field.data('value'));
        $("body").css("overflow","auto");
        $("#nav188296220").css("position","fixed");
        if(c.isSmall){  $("#rec196832202").css("position","relative");  
	    $("#rec238782757 .t450__burger_container").css("display","block");
    };
   });

   $(document).on('click',c.popupSpa + ' .t-popup__close',function(){
        
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
    
    updateFields( id, loadMonth, $date_field.data('value')); 

    let showSpa = param.show === undefined || param.show === NaN?1:param.show; 
    if(showSpa !== 1){ $(c.popupSpa + " .t-input-group_sb").hide(); }else{ $(c.popupSpa + " .t-input-group_sb").show(); }; 
    $(c.popupSpa + " select[name*='spa']").prop('selectedIndex', id); 

    let showSber = param.sber === undefined || param.show === NaN?1:param.sber;
    if(showSber !== 1){ $sber_field.hide(); }else{ $sber_field.show(); };      

});


$('a[href^="#order"]').on('click', function(e){   

  console.log(loadMonth); 

    $("body").css("overflow","hidden");    

    if(c.isSmall){ $("#rec196832202").css("position","absolute"); };

    $("#nav188296220").css("display","none");
    $('#rec200918319').removeClass('active');
    $("#rec205099373 .t450__burger_container").css("display","none");
	  $("#rec238782757 .t450__burger_container").css("display","none");
    $("#rec196832202 .t450__burger_container").css("display","none");
    
    let href = $(this).attr('href');
    let param = getParams(href);                
    let id = param.spa === undefined || param.spa === NaN ? $id_field.val() : param.spa; 
    $id_field.val(id);
    
    let showSpa = param.show === undefined || param.show === NaN ? 1 : param.show; 
    if(showSpa !== 1){ $(c.popupSpa + " .t-input-group_sb").hide(); }else{ $(c.popupSpa + " .t-input-group_sb").show(); }; 
    $(c.popupSpa + " select[name*='spa']").prop('selectedIndex', id);   

    let showSber = param.sber === undefined || param.show === NaN?1:param.sber;
    if(showSber !== 1){ /* console.log(showSber); */ $sber_field.hide(); }else{ $sber_field.show(); };

    updateFields(id, loadMonth, $date_field.data('value')); 

    console.log('loadMonth'); 
    console.log(loadMonth); 

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

