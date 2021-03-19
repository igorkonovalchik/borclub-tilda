const spas = require('../data/spadata')

function getTotalCost(currentTime, weekDay, spaId) {

  const endTime = 1440; // 24:00 = 1440 min 
  const halfTime = 900; // 15:00 time tarif change
  let spaTime = spas[spaId].minhours * 60; // минимальное время посещения бани в минутах 
  let totalTime = parseInt(currentTime) + spaTime; // currentTime - выбранное время плюс 

  let id2 = (weekDay === 'h' || weekDay === 'ny') ? 1 : (currentTime >= halfTime) ? 0 : 4; 
  if( weekDay === 'fm' ) { id2 = 2; }; 
  if( weekDay === 'fh' ) { id2 = 3; };

  //  case 'h': // hollyday - выходные ( чт, пт, сб, вс ) и новогодние праздники со 2 по 9 января
  //  case 'w': // work - рабочие ( пн вт ср )
  //  case 'ny': // с 29 декабря по 1 января двойной тариф
  
  let costHower = spas[spaId].prices[id2].price;
  let TotalCost = costHower * spas[spaId].minhours;

  if (totalTime > endTime) { // если часы перевалили за полночь

    let nightTime = totalTime - endTime;

    nightTime = Math.round(nightTime / 60);

    TotalCost = (spas[spaId].minhours - nightTime) * costHower + nightTime * costHower * 1.2;

  };

  if(weekDay === 'ny'){ TotalCost *= 2 }; // с 29 декабря по 1 января двойной тариф

  if (currentTime <= halfTime && totalTime > halfTime && weekDay === 'w') { // если пн, вт, ср и часы переваливают за 15:00

    let nextHalfTime = totalTime - 900;

    nextHalfTime = Math.round(nextHalfTime / 60);

    TotalCost = (spas[spaId].minhours - nextHalfTime) * costHower + nextHalfTime * spas[spaId].prices[0].price;

  };

  return TotalCost;

}


export default getTotalCost;