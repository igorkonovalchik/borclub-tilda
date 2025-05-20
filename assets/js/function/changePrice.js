
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

const activePromocode = (total) =>{
  let discountValue = Number(c.$discount_field.val());
      if (!isNaN(discountValue) && discountValue > 0 && discountValue <= 1) {
        let discountPrice = total * discountValue; // Применяем скидку
        c.$discount_price.val(discountPrice);
        let profit = total - discountPrice;
        let discountPercent = (1 - discountValue) * 100;
        let discountText = 'Скидка - '+ discountPercent.toFixed(0) + '%. Ваша ыыгода - ' + profit + ' руб.';
        c.$promo_error.text(discountText);
        return discountPrice;
      };
  return total;
};

const changePrice = (total, promocode = false) => { 
  let oldprice = c.$price_field.val() === NaN ? 0 : 0 + c.$price_field.val();
  if(oldprice !== total){
    c.$price_field.val(total); 
    if(c.$discount_field.val() !== 1){
    total = activePromocode(total);
    };
    const demo = new CountUp(c.priceId, oldprice, total, 0, 0.7, CountUpOptions);
    demo.start();
}else{
  if(promocode){
    if(c.$discount_field.val() == 1){
      oldprice = c.$discount_price.val();
      c.$discount_price.val("");
    }else{
      total = activePromocode(total);
      };
      const demo = new CountUp(c.priceId, oldprice, total, 0, 0.7, CountUpOptions);
      demo.start();
    };
  };
};


export default changePrice;