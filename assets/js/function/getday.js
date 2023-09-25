
const isInPeriod = (checkDate, startDate, endDate = '') => {

  checkDate = new Date(checkDate);
  startDate = new Date(startDate);
  endDate = endDate === ''?startDate:new Date(endDate);
  const oneDay = 86400000; // сутки в мс

  if(checkDate >= startDate.getTime() && checkDate < ( endDate.getTime() + oneDay ) ){ return true; };

  return false;

};


function getWeekDay(date = 0, curTime = 0, weekDays = false) {
    let time = date===0?new Date():new Date(date);
    let day = time.toLocaleString("eng", { weekday: 'short' });
    let ms = time.getTime();
       
    if(weekDays){ /* weekDays - определить будний день или выходные или праздники для установки утреннего часа с 9:00 или с 11:00 */
      if(day == 'Sat' || day == 'Sun' || day == 'сб' || day == 'вс'){ day = 'h'; }else{ day = 'w' }; 
    }else{
      if(day == 'Sat' || day == 'Sun' || day == 'Thu' || day == 'Fri' || day == 'пт' || day == 'сб' || day == 'чт' || day == 'вс'){ day = 'h'; }else{ day = 'w' };
    };

    if( isInPeriod( ms, '2023/12/22', '2024/01/08' ) || isInPeriod( ms, '2024/12/24', '2025/01/08' ) ){ day = 'ny' }; // если 29 декабря 2020 года 00:00 по 2 января 2021 года  00:00
    if( isInPeriod( ms, '2021/01/02', '2021/01/09' ) || isInPeriod( ms, '2022/01/02', '2022/01/09' ) ){ day = 'ny'; }; // если 2 января 2022 00:00 по 10 января 00:00
    if( isInPeriod( ms, '2024/02/23' ) ){ day = 'h'; }; // 23 февраля
    if( isInPeriod( ms, '2024/03/08' ) ){ day = 'h'; }; // 7, 8 марта
    if( isInPeriod( ms, '2024/05/02', '2024/05/03' ) || isInPeriod( ms, '2022/05/09', '2022/05/10' ) ){ day = 'h'; }; // 2, 3, 9, 10 мая

    if( isInPeriod( ms, '2023/11/06' ) ){ day = 'h' }; //  6 ноября 
    if( isInPeriod( ms, '2024/05/01' ) ){ day = 'h' }; //  1 мая 
    if( isInPeriod( ms, '2024/05/08', '2023/05/09' ) ){ day = 'h'; }; // 8, 9 мая
    if( isInPeriod( ms, '2021/06/14' ) || isInPeriod( ms, '2022/06/13' ) ){ day = 'h'; }; // 12 июня
    if( isInPeriod( ms, '2023/06/14', '2023/06/17' ) ){ day = 'fm'; }; // 14 и 17 июня было fm
    if( isInPeriod( ms, '2021/06/03' ) || isInPeriod( ms, '2021/06/04' ) ){ day = 'ny'; }; // 3 и 4 июня было fh
    if( isInPeriod( ms, '2021/11/04', '2021/11/05' ) || isInPeriod( ms, '2022/11/04' ) ){ day = 'h'; }; // 4 ноября

    if(curTime !== 0 && day === 'w'){ 
      if(curTime < 900){ day = 'wm'; }else{ day = 'we'; };
    };

    if(weekDays){ day = day == 'h' || day == 'ny' ? true : false; };
  
    return day;
  };
  

export default getWeekDay;
