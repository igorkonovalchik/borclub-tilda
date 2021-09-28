import * as c from '../data/const.js';
import moment from '../../../../plugins/moment/moment'
const spas = require('../data/spadata.js')

const getDates = (response = 'times', spaId = 0, day, time, $f ) => {

  $.ajax({
    type: "POST",
    url: `${c.server}/yclients/api.php`,
    data: 'response=' + response + '&spa=' + spaId + '&time=' + time + '&day=' + day  + '&cart='+encodeURIComponent(JSON.stringify(window.tcart)),
    dataType: 'json',
    success: function(data){  
    //  console.log('data from yclients');   
      // console.log(data);        
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

export default getDates;

