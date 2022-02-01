import * as c from '../data/const.js';
const spas = require('../data/spadata.js');

const isOctober = (checkDate = 0, startDate = '2021/10/01', endDate = '2021/10/31') => {

  if(checkDate===0){ 
    checkDate = new Date();
    checkDate = checkDate.getTime();
  };
  checkDate = new Date(checkDate);
  startDate = new Date(startDate);
  endDate = endDate === ''?startDate:new Date(endDate);
  const oneDay = 86400000; // сутки в мс

  if(checkDate >= startDate.getTime() && checkDate < ( endDate.getTime() + oneDay ) ){ return true; };

  return false;

};


const getDates = (response = 'times', spaId = 0, day, time, $f ) => {

if(response == 'times' && !c.activeYclients){ // запрашиваем цены только с константы 
//  console.log('spaId');  
//  console.log(spaId);  
  let services = spas[spaId].yclientsServices;
  if(isOctober(day) && spaId !== '0'){ services = spas[spaId].octoberYclientsServices; }; // показать старые цены в октябре
      let data = {
        times: null,
        days: null,
        services: services
    };
    $f && $f(data);
}else{
  $.ajax({
    type: "POST",
    url: `${c.server}/yclients/api.php`,
    data: 'response=' + response + '&spa=' + spaId + '&time=' + time + '&day=' + day  + '&cart='+encodeURIComponent(JSON.stringify(window.tcart)),
    dataType: 'json',
    success: function(data){  
       console.log('data from yclients');   
       console.log(data);        
      $f && $f(data);
    },
    error: function() { 
      console.log('huston we have a problem with Yclients');   
      let data = {
        times: null,
        days: null,
        services: spas[spaId].yclientsServices
     };
    $f && $f(data);
    }

   });

  };

};

export default getDates;

