const getParams = ( url ) => { 

  if (url.indexOf('?') > -1)
  {
    var params = {};        
    let start = url.indexOf ('?') + 1;    
    let query = url.substring(url.length, start);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
       return params; 
  }else{ 
    return false;
  }    

  }
  
  
export default getParams;