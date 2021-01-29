
import * as c from '../data/const.js';

const getSpa = (id = 0) => {

  console.log(c.url);

  $.ajax({
    type: "POST",
    url: `${c.server}/yclients/api.php`,
    data: 'cart='+encodeURIComponent(JSON.stringify(window.tcart)),
    dataType: 'json',
    success: function(data){
      console.log(data);
    },
    error: function(data) {

    }
    });

};

export default getSpa;