
import CountUp from './countUp.min'
import * as c from './../data/const.js'

// меняем стоимость с эффектом

let easingFn = function (t, b, c, d) {
  let ts = (t /= d) * t;
  let tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
  };

const CountUpOptions = {
  separator : ' ', 
  easingFn,
  decimal : '.', 
  prefix: '',
  suffix: ' руб.'
};

const changePrice = (total) => { 
  let oldprice = c.$price_field.val() === NaN ? 0 : 0 + c.$price_field.val(); 
  if(oldprice !== total){
    const demo = new CountUp(c.priceId, oldprice, total, 0, 0.7, CountUpOptions);
    demo.start();
    c.$price_field.val(total); 
  };
};

export default changePrice;