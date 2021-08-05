
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
      console.log(data);        
      $f && $f(data);
    },
    error: function() { 
      console.log('huston we have a problem');   
      console.log(data);  
    }
   });
};

export const activateCard = (response, $f ) => {
  $.ajax({
    type: "POST",
    url: `https://bordata.ru/gift/activateCard.php`,
    data: 'data='+encodeURIComponent(JSON.stringify(response)),
    dataType: 'json',
    success: function(data){   
      console.log(data);        
      $f && $f(data);
    },
    error: function() { 
      console.log('huston we have a problem');   
      console.log(data);  
    }
   });
};

export const truncate = (str, n) => {
  if(!str || str == undefined){ return ''; }; 
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

