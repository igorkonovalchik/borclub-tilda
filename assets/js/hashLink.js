
let hash = window.location.hash;

const updateURL = (param = '') => {
  if (history.pushState) {
  const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + param;
    window.history.pushState({path:newurl},'',newurl);
 } 
}

window.onload = function () {

  if (hash.substring(0, 11) === "#bookallspa") {
    $(window).scrollTop(100);
    setTimeout(function () {
        $('a[href="#order:bookspa=1?spa=3&sber=0"]').click();
      },
      500);
  };


  const $tlBtn = $('#tl-search-form iframe').contents().find('input.standard-view-button');
  const $numberBtn = $('a[href^="#tl-booking-open"]');
  const $tlCloseButton = $('#fancybox-container-1 .tl-fancybox-stage .tl-fancybox-slide .tl-fancybox-content .tl-fancybox-bfm-header-82122-close .tl-fancybox-button');

  $numberBtn.each(function() {

    $(this).on('click', function () {      
      let href = $(this).attr('href');  
      if (href.indexOf('?') > -1) {              
        const start = href.indexOf ('?');    
        href = href.substring(href.length, start);
        updateURL(href);    
      };    
      $tlBtn.click();      
    });    
  });
  

  $($tlBtn).on('click', function () { 
    $("body").css("overflow","hidden"); 

  });

  $($tlCloseButton).on('click', function () { 
    $("body").css("overflow","auto"); 
   });

 

/*
  if (hash.substring(0, 16) === "#tl-booking-open") {

    setTimeout(function () {
    $('#tl-search-form iframe').load(function () {
      console.log('iframe готов');
      $(this).contents().find('input.standard-view-button').click();
    });

    $(document).on('onload', 'iframe', function () {
      console.log('iframe готов iframe onload');
      $(this).contents().find('input.standard-view-button').click();
    });

    $('#tl-search-form').on('load', 'input.standard-view-button', function () {
      console.log('ye');
      $(this).click();
    });
  },
  500);

  };
  */

}
