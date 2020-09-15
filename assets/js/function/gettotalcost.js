

const spas = require('../data/spadata')

function getTotalCost( currentTime, weekDay, spaId ){ 

  
    const endTime = 1440; // 24:00 = 1440 min 
    let spaTime = spas[spaId].minhours * 60; // минимальное время посещения бани в минутах 
    let totalTime = parseInt(currentTime) + spaTime;  // currentTime - выбранное время плюс 

    let id2 = ( weekDay == 'h' )?1:( currentTime > 899 )?0:2;
    let costHower = spas[spaId].prices[id2].price;

    let TotalCost = costHower * spas[spaId].minhours;
    
    if( totalTime > endTime ){

        let nightTime = totalTime - endTime; 

          
        nightTime = Math.round( nightTime / 60 );

        TotalCost = ( spas[spaId].minhours - nightTime ) * costHower + nightTime * costHower * 1.2;
        
    }
    
    return TotalCost;    

  }
  
  
export default getTotalCost;