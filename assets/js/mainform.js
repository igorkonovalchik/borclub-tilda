    // Заполнение формы датой и временем на главной

import moment from '../../../plugins/moment/moment'
import getWeekDay from './function/getday'
import * as c from './data/const.js';

$(document).ready(function(){

let rumoment= moment();
rumoment.locale('ru'); 
let date = rumoment.add(1,'days');      

if($('#rec'+c.mainFormSpaId).length && !c.isSmall ){ 
		
	  $(`#rec${c.mainFormSpaId} input[name*='day']`).val(getWeekDay());
        
		$(`#rec${c.mainFormSpaId} input[name*='date']`).pickadate({
			min: 1,
			yearSelector: false,
			format: 'dd mmmm, ddd',
      formatSubmit: 'dd mmmm',
      today: '',
      onStart: function() {
        $(`#rec${c.mainFormSpaId} input[name*='date']`).attr('value', date ); // .data('value', nextDay ); //   
      },
			onSet: function(context) {  
				$('#rec'+c.mainFormSpaId+' input[name*="day"]').val(context.select);
			  }
		});

		$(`#rec${c.mainFormSpaId} input[name*='time']`).pickatime({
			format: 'HH:i',
			formatLabel: 'HH:i',
			formatSubmit: 'HH:i',
			interval: 60,
			min: [11,0],
      max: [22,0],
      onStart: function() {  
        $(`#rec${c.mainFormSpaId} input[name*='time']`).val(c.sec2time(900)).attr( 'value', 900 );            
      },
      onSet: function(c) {
          $(`#rec${c.mainFormSpaId} input[name*='time']`).data('current-time', c.select );                
      }
		});

	};


 });