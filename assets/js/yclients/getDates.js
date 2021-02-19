import * as c from '../data/const.js';
import moment from '../../../../plugins/moment/moment'

const Cartrumoment = moment();
Cartrumoment.locale('ru');
let date = Cartrumoment.add(1,'days');             
const nextDay = date.format('YYYY/MM/DD'); 

const getDates = (response = 'times', spaId = 0, day = nextDay, $f) => {

  $.ajax({
    type: "POST",
    url: `${c.server}/yclients/api.php`,
    data: 'response=' + response + '&spa=' + spaId + '&day=' + day + '&cart='+encodeURIComponent(JSON.stringify(window.tcart)),
    dataType: 'json',
    success: function(data){   
      // console.log(data);        
      $f && $f(data);
    },
    error: function(data) { 
      console.log('huston we have a problem');   
     // console.log(data);  
    }

   });

};

export default getDates;