
import changePrice from './changePrice'
import * as c from './../data/const.js'
const spas = require('./../data/spadata')

const updateCart = (id = -1, price = 0, product = false, delProduct = false, promocode = false, revertMultiplier = 1) => {  
  
// console.log('price - ' + price);
let promoText = "";

  if(id === -1 && price === 0){ 

    if(promocode){
/*
      price = window.tcart.total;
      let productext = window.tcart.products;

       // Получаем значение скидки
      let discountValue = Number(c.$discount_field.val());
      let promoText = "";

      // Проверяем, чтобы discountValue не был пустым и не больше 1
      if (!isNaN(discountValue) && discountValue > 0 && discountValue <= 1) {
        price *= discountValue; // Применяем скидку
          let discountPercent = (1 - discountValue) * 100;
          promoText = ` со скидкой ${discountPercent.toFixed(0)}% по промокоду ${c.$promo_field.val()}`;
      };

      if(revertMultiplier > 1){
        price *= revertMultiplier; // Применяем скидку
        promoText = "";
       }; 

      changePrice(price); 
      window.tcart.total = price;
      window.tcart.prodamount = price;
      window.tcart.amount = price;
      window.tcart.products = [{ name: productext + promoText, amount: price }];
*/
    }else{

      if(window.tcart !== undefined){
        window.tcart.total = 0;
        window.tcart.prodamount = 0;
        window.tcart.amount = 0; 
        window.tcart.products = []; 
      };
      changePrice(0);
      c.$seance_length_field.val(0);
  
      const spaId = c.$id_field.val() === '' || c.$id_field.val() === undefined ? 0 : c.$id_field.val();     
      const guestsCount = Number(c.$persons_field.val()); 
  
      if(guestsCount <= spas[spaId].person ){    
            product = {id: c.dopFreeGuestsId, amount: guestsCount, price_max: 0 };
          }else{ 
            const freeGuestsCount = spas[spaId].person; 
            const dopGuestsCount = guestsCount - freeGuestsCount; 
            product = [
              {id: c.dopFreeGuestsId, amount: freeGuestsCount, price_max: 0 }, 
              {id: c.dopGuestsId, amount: dopGuestsCount, price_max: c.dopGuestsPrice }
            ];
       }
      };
   
  }else{    
    changePrice(price); 
    if(c.$discount_field.val() < 1 && c.$discount_price.val() !== ""){
      let discountValue = Number(c.$discount_field.val());
      let discountPercent = (1 - discountValue) * 100;
      let promoText = ` стоимость указна со скидкой ${discountPercent.toFixed(0)}% по промокоду ${c.$promo_field.val()}. Без скидки - ${price} руб.`;
      price = c.$discount_price.val(); 
    };
    c.$id_field.val(id);
    window.tcart.total = price;
    window.tcart.prodamount = price;
    window.tcart.amount = price;
    window.tcart.products = [{ name: 'Аренда - ' + spas[id].title + promoText, amount: price }];
    console.log(window.tcart);
  };

    if(product && window.tcart !== undefined){
          let productIn = false; 
          const products = window.tcart.products
          .filter((i) => i !== undefined )
          .filter((i) => i.name === undefined )
          .map((i) => {
            i.amount = Number(i.amount);
            if(i.id == product.id){
              product.amount = Number(product.amount + i.amount); 
              i = Object.assign(i, product);
              productIn = true; 
            };
            return i;
          }); 
        //  window.tcart.products = !productIn ? [ ...products, product ] : [ ...products ];         
        }; 
    
    if(delProduct && window.tcart !== undefined){
      const products = window.tcart.products
          .filter((i) => i !== undefined )
          .map((i) => {
            if(i.id == delProduct.id){
              delProduct.amount = Number(i.amount) - Number(delProduct.amount); 
              i = Object.assign(i, delProduct);
            };
            return i;
          })
          .filter((i) => i.amount > 0 ); 
    //  window.tcart.products = [ ...products ];      
    }

    if(window.tcart !== undefined){
      c.$seance_length_field.val(0); 
      const totalProducts = window.tcart.products
      .reduce((a, i, count) => {
        if(i.seance_length !== undefined){ 
          const $seance_length = Number(c.$seance_length_field.val()) + i.seance_length * i.amount;
          c.$seance_length_field.val($seance_length); 
        }; 
        a[count] = {};
        a[count].id = Number(i.id ? i.id : 0 );
        a[count].amount = Number(i.amount ? i.amount : 1);
        return a;
      }, []);
      c.$services_field.val(JSON.stringify(totalProducts));    
      
    }

   
};

export default updateCart;