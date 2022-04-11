
import * as c from './data/const.js';

$(document).ready(function(){

const popUp = (id, action = 'open') => {
  switch (action) {
    case 'open':
     // $("body").css("overflow","hidden");	 
      setTimeout(function() {  
      $(id+' .t450__overlay').addClass('t450__menu_show');
      $('#nav'+id.slice(4)).addClass('t450__menu_show');
      $(id+' .t450__container').addClass('pod');
      }, 300);
    break;
    case 'close':
      $("body").css("overflow","auto");
      setTimeout(function() {  
      $(id+' .t450__overlay').removeClass('t450__menu_show');
      $('#nav'+id.slice(4)).removeClass('t450__menu_show');
      $(id+' .t450__container').removeClass('pod');
     }, 300);
    break;
  }
};

      for(const podmenu of c.podmenus){ 

        if( $(podmenu).length && $(c.globalmenu).length ){ 

        // let linkname = c.isSmall?'mobilemenuopen':'menuopen';

                $(c.globalmenu+' .t450__burger_container').hide();

                $(podmenu+' .t450__burger_container').on('click', function(e){
                            
                          //   console.log(linkname);
                          // $('a[href="#'+linkname+'"]').click().after(function(){
                                
                                popUp(podmenu);
                                popUp(c.globalmenu);
                          
                            // }); 
                });

                $(document).on('click','a[href="#close"], '+ podmenu +' .t450__overlay',function(e){
                      popUp(c.globalmenu, 'close');
                });

                $(document).on('click',podmenu + ' .t450__close',function(e){
                    popUp(c.globalmenu, 'close');
                });     

                $(c.globalmenu).on('click', function(e){
                    popUp(podmenu, 'close');
                    setTimeout(function() {  $(c.globalmenu+' .t450__container').removeClass('pod');  }, 500);
                });

                $(document).on('click','a[href="#close"], '+ c.globalmenu +' .t450__overlay',function(e){
                    popUp(c.globalmenu, 'close');
                });

                $(document).on('click', c.globalmenu + ' .t450__close',function(e){
                      popUp(c.globalmenu, 'close');
                  });   

            };

      };

 

 });