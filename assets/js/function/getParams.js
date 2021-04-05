const getParams = ( url ) => { 

  if (url.indexOf('?') > -1)
  {
    let params = {};        
    let start = url.indexOf ('?') + 1;    
    let query = url.substring(url.length, start);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
       return params; 
  }else{ 
    return false;
  }    

  }
  
  
export default getParams;