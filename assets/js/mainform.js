    // Заполнение формы датой и временем на главной

import moment from '../../../plugins/moment/moment'
import * as f from './function/functions.js'
import getWeekDay from './function/getday'
import * as c from './data/const.js';

$(document).ready(function(){

 if($(c.mainFormSpa).length && !c.isSmall ){ 

				c.$main_date_field.data('value', nextDay );
				c.$main_day_field.val(getWeekDay(nextDay));
				c.$main_time_field.val(f.sec2time(900)).attr( 'value', 900 );
				
				c.$main_date_field.pickadate({
													min: 1,
													max: c.maxDaysVisible,
													yearSelector: false,
													format: 'dd mmmm, ddd',
													today: '',
													clear: ''												
					});

				c.$main_time_field.pickatime({
													format: 'HH:i',
													formatLabel: 'HH:i',
													interval: 60,
													min: [11,0],
													max: [22,0],
											});

			};

 });