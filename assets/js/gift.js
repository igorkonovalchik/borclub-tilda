

 $(function(){
       
  const width = document.documentElement.clientWidth;
 
   
   
   if(width < 768){
       
       console.log('small');
      
   }else{
       
             $(".tn-elem__3261126931623396735580").appendTo(".envelope .front .mailme"); 
$(".tn-elem__3261126931623694773277").appendTo(".envelope .front .mailme");
$(".tn-elem__3261126931623694690969").appendTo(".envelope .front .mailme");

$('.tn-elem__3261126931623406992169').prependTo( '.tn-elem__3261126931623311386607 .container' );
$('.tn-elem__3261126931623397020735').prependTo( '.tn-elem__3261126931623311386607 .container' ); 
$('.tn-elem__3261126931623745252270').appendTo('.tn-elem__3261126931623311386607 .container' ); 

      
   };


if (!$('.envelope').hasClass('open')){
$('.tn-elem__3261126931623694773277').click(function(){
 $('.envelope').addClass('open');
  setTimeout(function(){
          $('.envelope').addClass('animated');
       }, 2800);
setTimeout(function(){
          
        $('.letter .card ').toggleClass('flipped');
       }, 4500);
});



$('.letter').click(function(){
//  $('.envelope').addClass('send');
});

$('.letter .card').on('click', function () {
 
   function explode(){
     $('.letter .card ').toggleClass('flipped');
   }
   setTimeout(explode, 400);
 
});

}

});