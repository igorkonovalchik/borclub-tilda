
import changePrice from './changePrice'
import * as c from './../data/const.js'
const spas = require('./../data/spadata')

const updateCart = (id = -1, price = 0, product = false, delProduct = false) => {  
  
  if(id === -1 && price === 0){ 
    window.tcart.total = 0;
    window.tcart.prodamount = 0;
    window.tcart.amount = 0; 
    window.tcart.products = []; 
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
   
  }else{      
    changePrice(price); 
    c.$id_field.val(id);
    window.tcart.total = price;
    window.tcart.prodamount = price;
    window.tcart.amount = price;     
  };

    if(product){
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
          window.tcart.products = !productIn ? [ ...products, product ] : [ ...products ];         
        }; 
    
    if(delProduct){
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
      window.tcart.products = [ ...products ];      
    }

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
 
};

export default updateCart;