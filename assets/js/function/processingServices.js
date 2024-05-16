const processingServices = (data) => {
  if(data === null || data.length === 0 ){ 
   // console.log('Нет услуг для загрузки цен');    
    return false;
  };
  // console.log(data);
  const $rentMinArr = data.sort(function(a, b) {
    return Number(a.price_max) - Number(b.price_max);
  });
  // .filter( (service) => service.seance_length > 3600 ) // только аренды без доп часов 
  // console.log('Список доступных услуг');
  // console.log($rentMinArr);
  const $rentTimes = {}; 
  if($rentMinArr.length !== 0){
    $rentTimes.wm = $rentMinArr[0];   // аренда 1 часа с 11 до 15                   
    if($rentMinArr.length > 2){        
      $rentTimes.we = $rentMinArr[1]; // аренда 1 часа с 15 до 23 
      $rentTimes.h = $rentMinArr[2]; // аренда 1 часа в выходные
      $rentTimes.fm = $rentMinArr[3]; // аренда 1 часа 2 и 5 июня
      $rentTimes.fh = $rentMinArr[4]; // аренда 1 часа 3 и 4 июня
      $rentTimes.ny = { ...$rentMinArr[2], 'price_max': $rentMinArr[2].price_max * 2 }; 
   //  $rentTimes.ny = $rentMinArr[3]; // новогодние цены
   //  $rentTimes.ny = $rentMinArr[2] * 2; // новогодние цены
    }else{  
          console.log('Ошибка! Количество услуг два и меньше!!!');         
          $rentTimes.we = $rentMinArr[0];
          $rentTimes.h = $rentMinArr[0];
          $rentTimes.ny = { ...$rentMinArr[0], 'price_max': $rentMinArr[0].price_max * 2 };  
    }; 
  };

  // console.log('Перебрали список услуг');
  // console.log($rentTimes);   
  return $rentTimes; 

}

export default processingServices;