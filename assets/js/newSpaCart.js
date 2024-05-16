// Форма корзина на странице бань
    
const spas = require('./data/spadata')
import moment from '../../../plugins/moment/moment'
import getWeekDay from './function/getday'
import getParams from './function/getParams'
import getDates from './yclients/getDates'
import updateCart from './function/updateCart'
import processingServices from './function/processingServices'
import * as f from './function/functions.js'
import * as c from './data/const.js'

const updatePrices = (data, time, disableTimes, fn) => {
  const id = c.$id_field.val();
  const minHours = spas[id].minhours; 
  const cleanHours = spas[id].cleanhours; 
  const totalTime = minHours + cleanHours;
  let firstTime = time / 60; 
  const date = c.$date_field.data('value');     
  let total = 0;
  let $rentMin = {};
    
  // console.log('Список доступных услуг');
  // console.log(data); 
 
  if(Object.keys(data).length !== 0){   
      
      // console.log('Выбранный день  ' + getWeekDay(date, time));
      for(let counter = 1; counter <= spas[id].minhours; counter++){
        $rentMin = data[getWeekDay(date, time)]; // Определяем к чему относится выбранные день
        total += Number($rentMin.price_max);
        time += 60; 
      };
      
      $rentMin.amount = spas[id].minhours; 
      $(c.newPopupSpa + ' .t706__form-upper-text').text( 'за ' + spas[id].minhours + ' ' + f.declination(spas[id].minhours, ['час', 'часа', 'часов']) + ' до ' + spas[id].person  + ' гостей');
  }else{
    $(c.newPopupSpa + ' .t706__form-upper-text').text( 'Ошибка. Попробуйте позже.');
    total = 0;
  };  

  total = Number(c.$price_field.val()) + total; 

  updateCart(id, total, $rentMin);

  // console.log('firstTime');
  // console.log(firstTime);

  // console.log('disableTimes');
  // console.log(disableTimes);

  const addPrices = disableTimes.filter((i) => i >= firstTime + minHours)
                                .map((i) => {
                                  const service = data[getWeekDay(date, i * 60)]; 
                                  let price = Number(service.price_max); 
                                  const id = Number(service.id); 
                                  const seance_length = Number(service.seance_length);
                                  price = i > 23 ? price * 1.4 : price; 
                                  return { time: i, price_max: price, id: id, amount: 1, seance_length: seance_length }
                                });

 // console.log('addPrices');
 // console.log(addPrices);

  fn && fn(addPrices);
};

const changeDisableDays = (data, date = false) => {
    const result = {};  
    result.select = ''; 
    if(data === null || data.length === 0 ){ 
      // console.log('All day in current and next month is free');
      result.select = date ? date : c.nextDay;
      // console.log('Set current day - ' + result.select);
      result.disable = false;
      return result;
    };
    if(typeof data === 'object' && !Array.isArray(data)){
      // console.log('load days from yclients');
      data = Object.values(data);
    };
     
    if(date){
      let dateObj = new Date(date);
      const dateM = moment(dateObj); 
      // // console.log(dateM);
     // const max = data.length - data.indexOf(dateM.format('YYYY-MM-DD')) - 1;
      const max = c.maxDaysVisible;
      for(let counter = 0; counter <= max; counter++){ 
        if(counter > 0){ dateM.add(c.fistDayBook,'days'); };
        date = dateM.format('YYYY-MM-DD');
        if(!data.includes(date)){ 
          result.select = dateM.format('YYYY/MM/DD');
          // console.log('we have free day!!! it"s: ' + result.select );
          break;
         };
       };
      if(result.select === ''){ // console.log('В ближайшие пол года доступных дат нет.');
     }
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
  const id = c.$id_field.val();
  const minHours = spas[id].minhours; 
  const cleanHours = spas[id].cleanhours; 
  const totalTime = minHours + cleanHours;
  const min = c.morningHourOpen;
  const max = c.lastHourBook;
  let disableTimes = [];  
  if(c.activeYclients){  
            let concat = [];
            let records = [];
            const fulltimetable = [];
            for (let counter = min; counter <= max; counter++) {  
              fulltimetable.push({'time': `${counter}:00`, 'is_free': true});
            };  

            if(data === 0 || Array.isArray(data) || data === null || data.length === 0 ){

                  // console.log('Обновляем время по умолчанию');

                  concat = fulltimetable; 
                  
            }else{

                  // console.log('Обновляем время из даты');

                  if(typeof data === 'object' && !Array.isArray(data)){
                    // console.log('records...');
                    records = data.records !== null && data.records !== undefined && !Array.isArray(data.records) ? Object.values(JSON.parse(data.records)) : [];
                    // console.log('records ok');
                    // console.log('times...');
                    data = data.times !== null && data.times !== undefined && !Array.isArray(data.times) ? JSON.parse(data.times)[0] !== undefined ? Object.values(JSON.parse(data.times)[0]) : {} : {};
                    // console.log('times ok');
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

          // // console.log('data');
          // // console.log(data[0]);

            // console.log('records count');
            // console.log(records.length);

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
            
            // console.log('result.disable');
            // console.log(result.disable);

            disableTimes = [ ...result.disable ]; 

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

            result.disable = f.unique( [ ...result.disable, ...cleanDisable ] );

            // console.log('result.disable + cleanhour');
            // console.log(result.disable);

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

            // console.log('newDisable');

            // console.log(newDisable);

            result.disable = f.unique( [ ...result.disable, ...newDisable, ...spas[id].disableTime ] ).sort((a, b) => a - b ); 

            // console.log('после чистки');

            // console.log(result.disable);
  }else{ 
    result.disable = []; 
  };

  result.min = [ min , 0 ];
  result.max = [ max , 0 ];

  let firstTime = max; 
  for(let i = min; i <= max; i++) { 
    if(!result.disable.includes(i)){
      if(c.$time_field.val().substr(0, 2) == i){ firstTime = i; break; }; 
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
      .filter((i) => i >= firstTime + minHours)
      .filter((i) => !disableTimes.includes(i))
      .filter((i, c, ar) => i === firstTime + minHours + c);

  return result;
};

const disableAllFields = (action = true) => {
  if(action){
    c.$submit.addClass('disable-input');
    c.$picker__table.addClass('disable-input');
    c.$picker__list.addClass('disable-input');
    $(c.newPopupSpa + ' input').each(function(){
      $(this).addClass('disable-input');
  });
  }else{
    c.$submit.removeClass('disable-input');
    c.$picker__table.removeClass('disable-input');
    c.$picker__list.removeClass('disable-input');
    $(c.newPopupSpa + ' input').each(function(){
      $(this).removeClass('disable-input');
  });
  }
};  

const loadingField = (start = true, fields = 'datetime') => {    
  if(start){
    $(c.newPopupSpa + " .minhour").hide();
    $(c.newPopupSpa + " #dopHoursInput").val(0);
    $(c.newPopupSpa + " .picker").each(function(){
      $(this).addClass('loading');
    });
    if(fields === 'datetime'){ 
      c.$date_field.addClass('loading');
      c.$time_field.addClass('loading');
    }else{ 
      $(c.newPopupSpa + ' .t706__form-upper-text').addClass('loading');
    };    
  //  $('#' + c.priceId).addClass('loading');      
  }else{
    $(c.newPopupSpa + " .picker").each(function(){
      $(this).removeClass('loading');
    });
    if(fields === 'datetime'){
    c.$date_field.removeClass('loading');
    c.$time_field.removeClass('loading');
  }else{ 
    $(c.newPopupSpa + ' .t706__form-upper-text').removeClass('loading');
 //   $('#' + c.priceId).removeClass('loading');
    };  
  };
  disableAllFields(start);
};


$(document).ready(function(){ 



  c.$date_field.parent().parent().addClass('w50').addClass('datefield');
  c.$time_field.parent().parent().addClass('w50').addClass('timefield');
  $("#rec279462841 input:checkbox[name*='whatsapp']").data('value', 'no_whatsapp' ).attr('value', 'no_whatsapp' );

if($(c.newPopupSpa).length ){ 
    $(c.newPopupSpa + ' .t706__cartwin-products').remove();
    $(c.newPopupSpa + ' .t706__cartwin-bottom').remove();
    $(c.newPopupSpa + ' .t-input-group_pm .t-input-title').remove();
    $(c.newPopupSpa + ' .t706__form-upper-text').after('<div id="' + c.priceId + '" class="t702__price">0</div>');
    $(c.newPopupSpa + " input[name*='Email']").val('no@email.net');
    $(c.newPopupSpa + " input[name*='Name']").addClass('t-input_bbonly');
    $(c.newPopupSpa + " input[name*='Phone']").addClass('t-input_bbonly'); 
    
    c.$email_field.hide();
  //  $(c.newPopupSpa + " .t-input-group_nm").hide();
  //  $(c.newPopupSpa + " .t-input-group_ph").hide();
  // $(c.newPopupSpa + " .t-input-group_cb").hide();
    $(c.newPopupSpa + " .t-input-group_pm").hide();
    c.$cash_field.hide();
         
    updateCart(); 

    c.$id_field.before(`
  <div class="t-input-group t-input-group_in counter">
  <div class="t-input-title t-descr t-descr_m"> Количество гостей </div>
  <div class="number">
    <span class="minus">-</span>
    <input id="personsInput" type="text" class="" value="0"/>
    <span class="plus">+</span>
  </div>
  </div>
  <div class="t-input-group t-input-group_in counter minhour">
    <div class="t-input-title t-descr t-descr_m"> Добавить часы? </div>
  <div class="number">
    <span class="minus">-</span>
    <input id="dopHoursInput" type="text" class="" value="0"/>
    <span class="plus">+</span>
  </div>
  </div>`);

  const $dopHours_field = $(c.newPopupSpa + " .minhour");
  const $hours_counter = $(c.newPopupSpa + " #dopHoursInput"); 
  const $persons_counter = $(c.newPopupSpa + " #personsInput");

    $(document).on('click', '.minus', function () {
      const $input = $(this).parent().find('input');
      const id = c.$id_field.val();
      let count = parseInt($input.val()) - 1;

      if($input.attr('id') === 'dopHoursInput' && count < 0){
        
        return false; 
      
      }else{

              if($input.attr('id') === 'personsInput'){
                count = count < 1 ? 1 : count;
                if( count >= spas[id].person){          
                  const total = Number(c.$price_field.val()) - c.dopGuestsPrice;           
                  updateCart(id, total, false, {id: c.dopGuestsId, amount: 1, price_max: c.dopGuestsPrice });
                }else{
                  updateCart(id, Number(c.$price_field.val()), false, {id: c.dopFreeGuestsId, amount: 1, price_max: 0 });
                };
                c.$persons_field.val(count);
              };
              if($input.attr('id') === 'dopHoursInput'){  
                  
                  count = count < 1 ? 0 : count;          
                  const disableTime = count >= 1 ? loadDisableTimes[count - 1] : loadDisableTimes[0]; 
                  console.log(disableTime);
                  console.log(disableTime.price_max);
                  const price = disableTime.time == 23 && count == 1 ? disableTime.price_max * 1.4 : disableTime.price_max; 
                  console.log(price); 
                  const total = Number(c.$price_field.val()) - price;     
                  console.log(total);      
                  updateCart(id, total, false, disableTime);
                  c.$dopHour_field.val(count);

              };
              $input.val(count);
              $input.change();

            };

              return false;
    });

    $(document).on('click', '.plus', function () {
      // console.log(window.tcart);
      const $input = $(this).parent().find('input');
      const id = c.$id_field.val();
      let count = parseInt($input.val()) + 1;
      if($input.attr('id') === 'personsInput'){
        const totalMax = spas[id].maxDopGuests + spas[id].person;
        if( count <= totalMax ){ 
            $input.val(count); 
            c.$persons_field.val(count);
            if( count > spas[id].person){             
              const total = Number(c.$price_field.val()) + c.dopGuestsPrice;              
              updateCart(id, total, {id: c.dopGuestsId, amount: 1, price_max: c.dopGuestsPrice });
            }else{
              updateCart(id, Number(c.$price_field.val()), {id: c.dopFreeGuestsId, amount: 1, price_max: 0 });
            };
        };
      }else{
        if($input.attr('id') === 'dopHoursInput'){  
          // console.log('loadDisableTimes');
          // console.log(loadDisableTimes);
          const totalMax = loadDisableTimes.length; 
          if( count <= totalMax ){ 
            $input.val(count); 
            c.$dopHour_field.val(count);             
            const total = Number(c.$price_field.val()) + loadDisableTimes[count - 1].price_max;            
            updateCart(id, total, loadDisableTimes[count - 1]);
         };
        }else{
          $input.val(count);
        };
      };
      
      $input.change();
      return false;
    });

    

    const $d = c.$date_field.pickadate({
        min: c.fistDayBook,
        max: c.maxDaysVisible,
        yearSelector: false,
        format: 'dd mmmm, ddd',
        formatSubmit: 'yyyy/mm/dd',
        today: '',
        clear: '',
        onStart: function() {
            c.$date_field.addClass('t-input_bbonly'); //.data('value', c.nextDay ); // .attr('value', c.nextDay )
          }
    });

    let openHour = getWeekDay(c.nextDay, 0, true) ? c.weekendMorningHourOpen : c.morningHourOpen;       
    
    const $t = c.$time_field.pickatime({
        format: 'HH:i',
        formatLabel: 'HH:i',
       // formatSubmit: 'HH:i',
        interval: 60,
        min: [openHour,0],
        max: [c.lastHourBook,0],      
        onStart: function() {  
            c.$time_field.addClass('t-input_bbonly'); // .val(f.sec2time(900)).attr( 'value', 900 );            
          },
        onSet: function(c) { }
    });  

    $(c.newPopupSpa + " .picker .picker__wrap").each(function(){
        $(this).prepend('<div class="sp-wrap"><div class="sp-wave"></div></div>');
    });

    const datepicker = $d.pickadate('picker');
    const timepicker = $t.pickatime('picker');
    let loadMonth = {}; // накопитель количества месяцев загруженных для выбранной бани
    let loadDisableTimes = {}; // state занятого времени
    let loadServices = {}; // state доступных услуг

    const updateFields = (id, lM, date ) => {

      loadingField();
      loadingField(true, 'titleprice');

      if(date === undefined){ date = c.nextDay; }; 
      
      id = id === '' ? 0 : id;

      c.$id_field.val(id); 
      c.$selectSpa_field.prop('selectedIndex', id); 
      c.$spaTitle.text( spas[id].title ); 

      if($persons_counter.val() < 2){
        $persons_counter.val(parseInt(spas[id].person / 2));
        c.$persons_field.val(parseInt(spas[id].person / 2));
      }else{ 
        if($persons_counter.val() > spas[id].person + spas[id].maxDopGuests){
          $persons_counter.val( parseInt(spas[id].person) );
          c.$persons_field.val( parseInt(spas[id].person) );
        };         
      };

      loadingField();

      const nowDate = new Date();
      const nowdateM = moment(nowDate); 
      const nowYear = Number(nowdateM.format('YYYY'));

      const curDate = new Date(date);
      const curdateM = moment(curDate); 
      const curYear = Number(curdateM.format('YYYY'));

      lM = lM == undefined ? {} : lM; 

      if(Object.keys(lM).length && curYear == nowYear){

        timepicker.set('enable', true)
                  .set('disable', timeTable().disable); 
        datepicker.set('enable', true);
  
       // console.log('Уже были загружены месяцы. Обновляем загрузку для +- 1 от выбранной даты');  
       
        const maxMonth = Number(curdateM.format('MM')) + 1;
        const minMonth = maxMonth - 2;   
        
        const newObj = {};
    
        newObj[curYear] = lM[curYear].filter((m) => m <= maxMonth && m >= minMonth );
        lM = newObj;
  
       //  console.log('А именно: ');
       //  console.log(lM[curYear]);
  
      }else{
       // console.log('Первая загрузка данных! Грузим: ' + c.nextDay);
        c.$date_field.data('value', c.nextDay );
      //  console.log('ok!');
        c.$day_field.val(getWeekDay(c.nextDay));
        lM = c.nextDay;
      };     

      

    getDates('days', id, f.getMonth(lM), 0, (data) => { 
        // console.log('Получаем ответ');
        // console.log(data);
        lM = {}; 
        const tt = changeDisableDays(data.days, date);
        lM = data.months;
        // console.log('Пишем данные в lM -');
        // console.log(lM);
        // console.log('Преобразуем данные для загрузки в поля');
        // console.log(tt);
        if(tt.disable && c.activeYclients){ datepicker.set('disable', tt.disable ); };
        if(tt.select !== '' && tt.select !== undefined ){
          // console.log('Дата выбора ' + tt.select + ' установлена');
          const selectDay = c.activeYclients ? tt.select : date; 
          datepicker.set('select', selectDay, { format: 'yyyy/mm/dd' });
          loadingField(false);
        }else{
          // console.log('Даты выбора в загруженных месяцах нет ставим текущую дату и морозим поля ');
          c.$date_field.data('value', c.nextDay );
        //loadingField(false);
          loadingField();
        };
        loadMonth = lM;
        });   
    };  

    timepicker.on({
      render: function() { 
          // console.log('render');
      },
      open: function() {
        // console.log('Открыт список времени! Обновляем ');
          loadingField();
          if(loadDisableTimes.length > 0 ){
            $dopHours_field.show(); 
          };
          timepicker.set('enable', true)
                    .set('disable', timeTable().disable); 
          getDates('times', c.$id_field.val(), c.$date_field.data('value'), 0, (data) => { 
            // console.log('Часы получены успешны: ');
            loadServices = processingServices(data.services);  
            // console.log(data.times);
            const tt = timeTable(data.times);
            loadDisableTimes = tt;
            // console.log('update loadDisableTimes');
            // console.log(loadDisableTimes);
            // console.log('Преобразуем для загрузки часов в поля: ');
            // console.log(tt);
            if(tt && c.activeYclients){ 
              timepicker.set('disable', tt.disable); 
            };
            // console.log('Обновляем часы');
            loadingField(false);
          });
      },
      set: function(s) {
        if(s.select !== undefined){
          updateCart(); 
          const id = c.$id_field.val();
          if($persons_counter.val() > spas[id].person ){
            const total = ( Number($persons_counter.val()) - spas[id].person ) * c.dopGuestsPrice; 
            updateCart(id, total);
          };
          // console.log('Время изменили. Меняем стоимость! ');
          // console.log('Запрос в базу с данными: spaID - ' + c.$id_field.val() + ' date -' + c.$date_field.data('value') + ' time -' + s.select);
          loadingField(true, 'titleprice');
      //    getDates('services', c.$id_field.val(), c.$date_field.data('value'), s.select, (data) => {  
        //    loadServices = processingServices(data);                  
            updatePrices(loadServices, s.select, loadDisableTimes.dopHours, (addPrices) =>{
              loadDisableTimes = addPrices; 
              // console.log('update loadDisableTimes');
              // console.log(loadDisableTimes);
              if(loadDisableTimes.length > 0 ){
                $dopHours_field.show(); 
              }else{
                $dopHours_field.hide(); 
              };
              loadingField(false, 'titleprice');
            });            
       //   });
       /*   // console.log('Подгружаем доп часы');
           */
        };
      }
    });
    
    
    datepicker.on({
      render: function() { 
        // // console.log('render');
      },
      open: function() {
            // console.log('Открыт слайдер! Обновляем загруженные ранее месяцы! ');
            loadingField();
            if(loadDisableTimes.length > 0 ){
              $dopHours_field.show(); 
            };
            datepicker.set('enable', true);
            // console.log(loadMonth);
            loadingField();
            getDates('days', c.$id_field.val(), f.getMonth(loadMonth), 0, (data) => { 
                const tt = changeDisableDays(data.days);
                if(tt && c.activeYclients){ 
                  // console.log('Успех! Обновили!');
                  datepicker.set('disable', tt.disable);
                };
                loadingField(false);
            });    
      },
      set: function(s) {
        const id = c.$id_field.val();
        // datepicker.set('disable', { from: [2021,c.highlight.month,10], to: [2021,c.highlight.month,20] });
        if(s.select !== undefined){ // change date event
          // console.log('День изменен. Загружаем занятые часы'); 
          let date = moment(s.select).format("YYYY/MM/DD");
          c.$date_field.data('value', date ).attr('value', date );
          let openHour = getWeekDay(date, 0, true) ? c.weekendMorningHourOpen : c.morningHourOpen;          
          loadingField();
          timepicker.set('enable', true)
                    .set('disable', timeTable().disable)
                    .set('min', [openHour,0]); 
          getDates('times', id, date, 0, (data) => { 

            
            // console.log('Часы получены успешны: ');
            loadServices = processingServices(data.services);  
            // console.log(data.times);
            const tt = timeTable(data.times);
            loadDisableTimes = tt;
            // console.log('update loadDisableTimes');
            // console.log(loadDisableTimes);
            // console.log('Преобразуем для загрузки часов в поля: ');
            // console.log(tt);

            if(tt && c.activeYclients){ 
              timepicker.set('disable', tt.disable)                          
                          .set('max', tt.max)       
                          .set('select', tt.select)
                  }else{                    
                    if(c.$time_field.val() == ''){ timepicker.set('select', 900); }else{
                      timepicker.set('select', Number(c.$time_field.val().substr(0, 2))*60 );
                    }; 
                  };
            // console.log('Обновляем часы');
            loadingField(false);
          }); 
        }else{
          if(s.highlight !== undefined && s.highlight.month !== undefined){ // change slide calendar event
            // console.log('Слайдер календаря переключен. Данные - ');
            let year = s.highlight.year;
            let month = s.highlight.month;
            // console.log('Год - ' +  year  + ' Месяц - ' + month );
            // console.log('Проверяем в загруженных есть ли в массиве или является последним загруженным месяцем');
            // console.log(loadMonth);
            let goLoadDayes = false; 
            if(loadMonth[year] !== undefined){
                  if(!loadMonth[year].includes(month) || month === f.getMax(loadMonth[year])){
                    goLoadDayes = true; 
                  }else{ // console.log(month + ' уже есть и не последний');
                 }; 
          }else{ goLoadDayes = true; }; 
          if(goLoadDayes){
            // console.log('Грузим! Получаем месяц - ' + year + '-' + month);
            loadingField();
            getDates('days', id, year + '-' + month, 0, (data) => { 
            const tt = changeDisableDays(data.days);
              if(tt && c.activeYclients){ 
                datepicker.set('disable', tt.disable ); 
                for(const year in data.months) {
                  loadMonth[year] = [...loadMonth[year], data.months[year]].flat().filter((v, i, a) => a.indexOf(v) === i);
                };
                // console.log('Добавляем новые месяцы в loadMonth. Получаем: ');
                // console.log(loadMonth);       
                  };
                  loadingField(false);
            });
          }; 
          }else{
           //  console.log(c);
          };
        };
      }
    });


    c.$spa_field.change(function() {
        
        const id = $(c.newPopupSpa + " select[name*='spa'] option:selected").index(); 
        updateFields( id, loadMonth, c.$date_field.data('value')); 

    });

    $( "#rec279462841 input:checkbox[name*='whatsapp']").parent().click(function() {

      const input = $("#rec279462841 input:checkbox[name*='whatsapp']"); 
      const value = input.is(':checked') ? 'yes_whatsapp' : 'no_whatsapp';
      input.data('value', value ).attr('value', value ); 

  });
    

    $(c.newPopupSpa +' input[type=radio][name=paymentsystem]').change(function() {
        if (this.value == 'sberbank') {
            c.$email_field.show();
            c.$cash_field.show();
            $(c.newPopupSpa + ' .t-submit').text('Оплатить');
            $(c.newPopupSpa + " input[name*='Email']").addClass('t-input_bbonly').val('');            
        }
        else if (this.value == 'cash') {
            $(c.newPopupSpa + ' .t-submit').text('Отправить заявку');
        };
        
    });

    $(document).on('click','a[href="#close"], '+ c.newPopupSpa +' .t396__filter',function(e){
       //  console.log('закрываем корзину');
        // console.log(c.$date_field.data('value'));
        $("body").css("overflow","auto");
        $("#nav188296220").css("position","fixed");
        if(c.isSmall){  $("#rec196832202").css("position","relative");  
          $("#rec238782757 .t450__burger_container").css("display","block");
        };
  
   });

   $(document).on('click',c.newPopupSpa + ' .t706__close-button',function(){  
    console.log('click t706__close-button');      
        $("body").css("overflow","auto");
        $("#nav188296220").css("position","fixed");
        if(c.isSmall){ $("#rec196832202").css("position","relative");
           $("#rec238782757 .t450__burger_container").css("display","block");
      };
    $(c.newPopupSpa + ' .t706__cartwin').removeClass('t706__cartwin_showed');
    });

    $(`#form${c.newPopupSpa.slice(4)}.js-form-proccess`).data('formsended-callback', 'window.hideInput' );

    window.hideInput = function ($form) {
         $(c.newPopupSpa + ' .t706__cartwin-heading').text('ЗАЯВКА ОТПРАВЛЕНА');
         $(c.newPopupSpa + ' .t706__form-upper-text').hide();
         $(c.newPopupSpa + ' .t702__price').hide();
         $(c.newPopupSpa + ' .t-form__inputsbox').hide();
         $(c.newPopupSpa + ' .t706__form-bottom-text').hide();
        //  updateCart('prepare');
        // const formArr = $form.serializeArray();         
       /*  getDates('newPost', '', '', '', (data) => { 
          // console.log('newPost');
          // console.log(data);
        });  */
    };




$('a[href^="#openspa"]').on('click', function(e){ 

 // $("body").css("overflow","hidden");    
    
    let href = $(this).attr('href');
   // console.log('href');
   // console.log(href);
    let param = getParams(href); 
   // console.log('param');
  //  console.log(param);
    let id = param.spa === undefined || param.spa === NaN?c.$id_field.val():param.spa;   
    
    updateFields( id, loadMonth, c.$date_field.data('value')); 

    let showSpa = param.show === undefined || param.show === NaN?1:param.show; 
    if(showSpa !== 1){ $(c.newPopupSpa + " .t-input-group_sb").hide(); }else{ $(c.newPopupSpa + " .t-input-group_sb").show(); }; 
    $(c.newPopupSpa + " select[name*='spa']").prop('selectedIndex', id); 

    let showSber = param.sber === undefined || param.show === NaN?1:param.sber;
    if(showSber !== 1){ c.$sber_field.hide(); }else{ c.$sber_field.show(); };      

});


$('a[href^="#order"]').on('click', function(e){   

    // console.log('id '); 

  // console.log(loadMonth); 

  //  $("body").css("overflow","hidden");    

    if(c.isSmall){ $("#rec196832202").css("position","absolute"); };

    $("#nav188296220").css("display","none");
    $('#rec200918319').removeClass('active');
    $("#rec205099373 .t450__burger_container").css("display","none");
	  $("#rec238782757 .t450__burger_container").css("display","none");
    $("#rec196832202 .t450__burger_container").css("display","none");
    
    let href = $(this).attr('href');
    let param = getParams(href);    
          
    let id = param.spa === undefined || param.spa === NaN ? c.$id_field.val() : param.spa; 

   // console.log('id -' + id); 

    c.$id_field.val(id).attr('value', id);
    
    let showSpa = param.show === undefined || param.show === NaN ? 1 : param.show; 
    if(showSpa !== 1){ $(c.newPopupSpa + " .t-input-group_sb").hide(); }else{ $(c.newPopupSpa + " .t-input-group_sb").show(); }; 
    $(c.newPopupSpa + " select[name*='spa']").prop('selectedIndex', id);   

    let showSber = param.sber === undefined || param.show === NaN?1:param.sber;
    if(showSber !== 1){ /* console.log(showSber); */ c.$sber_field.hide(); }else{ c.$sber_field.show(); };

    updateFields(id, loadMonth, c.$date_field.data('value')); 

    // console.log('loadMonth'); 
    // console.log(loadMonth); 

   });   

    jQuery(function($){
        $(document).mouseup(function (e){ // событие клика по веб-документу
            let div = $(c.newPopupSpa + ' .t706__cartwin-content'); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0
                && $(c.newPopupSpa + ' .t706__cartwin').hasClass('t706__cartwin_showed')) { // и не по его дочерним элементам                    
                   // $('#rec200918319').addClass('active');
                   $("body").css("overflow","auto");
                   if(c.isSmall){  $("#rec196832202").css("position","relative");  };
                   $("#nav188296220").css("display","block");
                   $("#rec238782757 .t450__burger_container").css("display","block");
                  
            }
        });
    });

     /* Заполнение формы датой и временем на главной  */

   //  console.log('gooo');

    // const $main_spa_field = $(c.mainFormSpa + " select[name*='spa']");

    if($(c.mainFormSpa).length && !c.isSmall && $(c.newPopupSpa).length ){ 	
      
      console.log(`#form${c.mainFormSpa.slice(4)}.js-form-proccess`);
      
    /* Если форма на главной отправляется успешно то данные передаем в корзину для дальнейшего оформления */
     // $(`#form${c.mainFormSpa.slice(4)}.js-form-proccess`).data('success-callback', 'window.openCart' );
  

      $(`#form${c.mainFormSpa.slice(4)} .t-submit`).on('click', function(){
        let id = $(c.mainFormSpa + " select[name*='spa'] option:selected").index();   
        $('a[href="#order:bookspa=1?sber=0"]').attr('href', '#order:bookspa=1?sber=0&spa=' + id);
                   
        $('a[href="#order:bookspa=1?sber=0&spa=' + id + '"]')[0].click(function(){
          updateFields( id, loadMonth, c.$main_date_field.data('value') ); 
          c.$main_date_field.prop('disabled', true);
          c.$main_time_field.prop('disabled', true);
          c.$main_day_field.prop('disabled', true);
          c.$main_submit_field.prop('disabled', true);
        });
      });
        
      };

    };

});



