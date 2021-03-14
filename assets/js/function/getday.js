
const isInPeriod = (checkDate, startDate, endDate = '') => {

  checkDate = new Date(checkDate);
  startDate = new Date(startDate);
  endDate = endDate === ''?startDate:new Date(endDate);
  const oneDay = 86400000; // сутки в мс

  if(checkDate >= startDate.getTime() && checkDate < ( endDate.getTime() + oneDay ) ){ return true; };

  return false;

};


function getWeekDay(date = 0, curTime = 0) {
    let time = date===0?new Date():new Date(date);
   
    let day = time.toLocaleString("eng", { weekday: 'short' });
    let ms = time.getTime();
    if(day == 'Sat' || day == 'Sun' || day == 'Thu' || day == 'Fri' || day == 'пт' || day == 'сб' || day == 'чт' || day == 'вс'){ day = 'h'; }else{ day = 'w' };
    if( isInPeriod( ms, '2020/12/30', '2021/01/01' ) || isInPeriod( ms, '2021/12/30', '2022/01/01' ) ){ day = 'ny' }; // если 29 декабря 2020 года 00:00 по 2 января 2021 года  00:00
    if( isInPeriod( ms, '2021/01/02', '2021/01/10' ) || isInPeriod( ms, '2022/01/02', '2022/01/10' ) ){ day = 'h'; }; // если 2 января 2021 00:00 по 10 января 00:00
    if( isInPeriod( ms, '2021/02/23' ) || isInPeriod( ms, '2022/02/23' ) ){ day = 'h'; }; // 23 февраля
    if( isInPeriod( ms, '2021/03/08' ) || isInPeriod( ms, '2022/03/08' ) ){ day = 'h'; }; // 8 марта
    if( isInPeriod( ms, '2021/05/01' ) || isInPeriod( ms, '2022/05/01' ) ){ day = 'h'; }; // 1 мая
    if( isInPeriod( ms, '2021/05/09' ) || isInPeriod( ms, '2022/05/09' ) ){ day = 'h'; }; // 9 мая
    if( isInPeriod( ms, '2021/06/12' ) || isInPeriod( ms, '2022/06/12' ) ){ day = 'h'; }; // 12 июня
    if( isInPeriod( ms, '2021/11/04' ) || isInPeriod( ms, '2022/11/04' ) ){ day = 'h'; }; // 4 ноября
    
    if(curTime !== 0 && day === 'w'){ 
      if(curTime < 900){ day = 'wm'; }else{ day = 'we'; };
    };

    return day;
  };

export default getWeekDay;
