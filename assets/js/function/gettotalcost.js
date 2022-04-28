const spas = require('../data/spadata')

function getTotalCost(currentTime, weekDay, spaId) {

  const endTime = 1440; // 24:00 = 1440 min 
  const halfTime = 900; // 15:00 time tarif change
  let spaTime = spas[spaId].minhours * 60; // минимальное время посещения бани в минутах 
  let totalTime = parseInt(currentTime) + spaTime; // currentTime - выбранное время плюс 

  let costHower = spas[spaId].newPrices[weekDay];
  let TotalCost = costHower * spas[spaId].minhours;

  if (totalTime > endTime) {

    let nightTime = totalTime - endTime;

    nightTime = Math.round(nightTime / 60);

    TotalCost = (spas[spaId].minhours - nightTime) * costHower + nightTime * costHower * 1.2;

  };
/*
  if (currentTime <= halfTime && totalTime > halfTime && weekDay === 'w') {

    let nextHalfTime = totalTime - 900;

    nextHalfTime = Math.round(nextHalfTime / 60);

    TotalCost = (spas[spaId].minhours - nextHalfTime) * costHower + nextHalfTime * spas[spaId].prices[0].price;

  }; */

 // console.log(TotalCost)
  return TotalCost;

}


export default getTotalCost;