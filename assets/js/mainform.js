    // Работа с формой на главной

    
const spas = require('./spadata')
import CountUp from './countUp.min'
import moment from '../../../plugins/moment/moment'
import getWeekDay from './getday'
import getTotalCost from './gettotalcost'

$(document).ready(function(){

var rumoment= moment();
rumoment.locale('ru'); 

if($('#rec188259966').length ){ 
		
		$("#rec188259966 input[name*='date']").data('value', rumoment.format('YYYY/MM/DD') ).attr('value', rumoment.format('YYYY/MM/DD') );
        $("#rec188259966 input[name*='time']").attr("placeholder", '14:00');
        $("#rec188259966 input[name*='day']").val(getWeekDay());
        
		$("#rec188259966 input[name*='date']").pickadate({
			min: true,
			yearSelector: false,
			format: 'dd mmmm, ddd',
			formatSubmit: 'dd mmmm',
			onSet: function(context) {  
				$("#rec188259966 input[name*='day']").val(getWeekDay(context.select));
			  }
		});

		$("#rec188259966 input[name*='time']").pickatime({
			format: 'HH:i',
			formatLabel: 'HH:i',
			formatSubmit: 'HH:i',
			interval: 60,
			min: [11,0],
            max: [22,0],
              onSet: function(c) {
                $("#rec188259966 input[name*='time']").data('current-time', c.select );                
              }
		})

		if($('#rec201440514').length ){
			$('#rec201440514 .t702__text-wrapper .t702__title').after('<div id="valprice" class="t702__price"></div>');
		}

	$('#form188259966.js-form-proccess').data('success-callback', 'window.openSPA');


	window.openSPA = function ($form) {

        /* $form - jQuery объект ссылающийся на форму */   

        /* номер заявки (Lead ID) */
        var formresult = $form.data('tildaformresult');
        var leadid = formresult.tranid;

        /* все поля заявки в  */
        var arr = {};
        $($form.serializeArray()).each(function(i, el) {
            arr[el.name] = el.value;
        });		
        
       //  console.log(arr);

        /*
          для обращения к значению поля используйте:
          arr["Name"]
          arr["Phone"]
          arr["Email"]
          и так далее...
        */   
       
       $('a[href="#bookone"]').click().after(function(){

  
    //	$('#rec188259966 .t-form__inputsbox').removeClass('t690__inputsbox_hidden');

        $('#rec188259966').hide();

        // var date = $("#rec188259966 input[name*='date_submit']").val();

        let date = arr["date_submit"];
            
     //   var time = $("#rec188259966 input[name*='time_submit']").val();

        let time = arr["time_submit"];
        
     //  var day = $("#rec188259966 input[name*='day']").val();

        let day = arr["day"];        

        let id2 = (day == 'h')?1:0;

        var id = $("#rec188259966 select[name*='spa']").prop('selectedIndex');
                
        $("#rec201440514 input[name*='date']").val(date);
        $("#rec201440514 input[name*='time']").val(time);
        $("#rec201440514 input[name*='id']").val(id);
        
        var opt = {
            separator : ' ',
            decimal : '.', 
            prefix: '',
            suffix: ' руб.'
          };
        
        let hourp = (id == 0)?'часов':'часа';

        // let TotalCost = spas[id].prices[id2].price * spas[id].minhours;        

        let currentTime = $("#rec188259966 input[name*='time']").data('current-time');

        let TotalCost = getTotalCost(currentTime, day, id);        
    
        $("#rec201440514 input[name*='id']").val(id);
        $("#rec201440514 input[name*='price']").val( TotalCost );
        $('#rec201440514 .t702__title').text( spas[id].title );
        $('#rec201440514 .t702__descr').text( 'от ' +  spas[id].minhours + ' ' + hourp + ' до ' + spas[id].person  + ' гостей ' + date + ' в ' + time );
        var startprice = new CountUp("valprice", 0, TotalCost, 0, 0.2, opt);
        startprice.start();
     });


	}
	


	}


 });