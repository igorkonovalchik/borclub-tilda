
export const delimiter = (number) => { // пробелы между тысячными   
  if(!number.toString().includes(' ')){   
     let ns = (parseInt(number) * 1).toString();
     let l = ns.length;
     let first = (l % 3 === 0) ? 3 : l % 3;
     let s = ns.substr(0, first);
     for(let i=first; i<l; i+=3) {
                 s += ' ' + ns.substr(i, 3);
     };
     return s;
   };
   return number;  
};

export const getUtmParameter = (sParam) => {
  const url = window.location.search.substring(1);
  const urlVariables = url.split('&');

  for (let i = 0; i < urlVariables.length; i++) {
    const variables = urlVariables[i].split('=');

    if (variables[0] === sParam) {
      return variables[1]
    }
  }
};


export const getOrder = (response, $f ) => {
  $.ajax({
    type: "POST",
    url: `https://bordata.ru/gift/getOrder.php`,
    data: 'data='+encodeURIComponent(JSON.stringify(response)),
    dataType: 'json',
    success: function(data){   
     // console.log(data);        
      $f && $f(data);
    },
    error: function(data) { 
      console.log('huston we have a problem');   
    //  console.log(data);  
    }
   });
};


export const geocode = (address, $f ) => {
  $.ajax({
    type: "POST",
    url: `https://bordata.ru/gift/geocode.php`,
    data: 'address=' + address,
    dataType: 'json',
    success: function(data){   
      console.log(data); 
      data.status = true;       
      $f && $f(data);
    },
    error: function() { 
      console.log('huston we have a problem');  
      const data = {};
      data.status = false;
      $f && $f(data);  
    }
   });
};

export const activateCard = (response, $f ) => {
  console.log(response);  
  $.ajax({
    type: "POST",
    url: `https://bordata.ru/gift/activateCard.php`,
    data: 'data='+encodeURIComponent(JSON.stringify(response)),
    dataType: 'json',
    success: function(data){                
      $f && $f(data);
    },
    error: function (jqXHR, exception) {
      var msg = '';
      if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
          msg = 'Time out error.';
      } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
      } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }
      console.log(msg);  
      console.log(exception); 
  },
   });
};

export const truncate = (str, n) => {
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};


export const phoneAuth = (response, $f ) => {  
  console.log(response);   
  $.ajax({
    type: "POST",
    url: `https://bordata.ru/phoneAuth/${response.operation}.php`,
    data: 'data='+ encodeURIComponent(JSON.stringify(response.data)),
    dataType: 'json',
    success: function(data){   
      console.log(data);        
      $f && $f(data);
    },
    error: function (jqXHR, exception) {
      var msg = '';
      if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
          msg = 'Time out error.';
      } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
      } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }
      console.log(msg);       
  },
   });
};

export const limitText = (field, maxChar) => {
  const ref = $(field),
      val = ref.val();
  if ( val.length >= maxChar ){
      ref.val(function() {
          return val.substr(0, maxChar);       
      });
  }
}

export const getUrlParameter  = (sParam) => {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};

