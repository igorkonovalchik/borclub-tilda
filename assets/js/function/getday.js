

function getWeekDay(date = 0) { 
    var time = date===0?new Date():new Date(date);
    var day = time.toLocaleString("eng", { weekday: 'short' });                
    if(day == 'Sat' || day == 'Sun' || day == 'Thu' || day == 'Fri' || day == 'пт' || day == 'сб' || day == 'чт' || day == 'вс'){ day = 'h'; }else{ day = 'w' };
    return day;    
  }
  
  
export default getWeekDay;