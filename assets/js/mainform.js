    // Заполнение формы датой и временем на главной

import moment from '../../../plugins/moment/moment'
import * as f from './function/functions.js'
import getWeekDay from './function/getday'
import * as c from './data/const.js';


$(document).ready(function(){

 if($(c.mainFormSpa).length && !c.isSmall ){ 

				c.$main_date_field.data('value', c.nextDay );
				c.$main_day_field.val(getWeekDay(c.nextDay));
				c.$main_time_field.val(f.sec2time(900)).attr( 'value', 900 );
				
				c.$main_date_field.pickadate({
													min: c.fistDayBook,
													max: c.maxDaysVisible,
													yearSelector: false,
													format: 'dd mmmm, ddd',
													today: '',
                          clear: '',		
                          onSet: function(s){       	
                            if(s.select !== undefined){ 
                              let date = moment(s.select).format("YYYY/MM/DD");
                              c.$main_date_field.data('value', date ).attr('value', date );
                            }
                          }										
					});

				c.$main_time_field.pickatime({
													format: 'HH:i',
													formatLabel: 'HH:i',
													interval: 60,
													min: [c.morningHourOpen,0],
                          max: [c.lastHourBook,0]
											});

			};

 });