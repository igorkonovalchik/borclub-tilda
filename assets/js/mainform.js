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
				
				const $md =	c.$main_date_field.pickadate({
													min: c.fistDayBook,
													max: c.maxDaysVisible,
													yearSelector: false,
													format: 'dd mmmm, ddd',
													today: '',
                          clear: ''									
					});

				let openHour = getWeekDay(c.nextDay, 0, true) ? c.weekendMorningHourOpen : c.morningHourOpen;

				const $mt =	c.$main_time_field.pickatime({
													format: 'HH:i',
													formatLabel: 'HH:i',
													interval: 60,
													min: [openHour,0],
                          max: [c.lastHourBook,0]
											});

				const mdatepicker = $md.pickadate('picker');
				const mtimepicker = $mt.pickatime('picker');

				mdatepicker.on({
					set: function(s) {
						if(s.select !== undefined){ 
							let date = moment(s.select).format("YYYY/MM/DD");
							let openHour = getWeekDay(date, 0, true) ? c.weekendMorningHourOpen : c.morningHourOpen;
							c.$main_date_field.data('value', date ).attr('value', date );
							mtimepicker.set('min', [openHour,0]); 
						}
					}
				});

			};

 });