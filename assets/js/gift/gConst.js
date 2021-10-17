import moment from '../../../../plugins/moment/moment'

const Cartrumoment = moment();
Cartrumoment.locale('ru');
const curTime = Number(Cartrumoment.format('HHmm'));
export const currentTime = Cartrumoment.format('HH:mm');
export const currentDay = Cartrumoment.format('YYYY/MM/DD');
const days = 1; 
let date = Cartrumoment.add(days,'days');  
export const nextDay = date.format('YYYY/MM/DD'); 

/* Константы страницы покупки серта */

export const emptyOrder = { 
  price: 0,
  gift: 'digital',
  design: 'green',
  nameRecipient: '',
  phoneRecipient: '',
  emailRecipient: '',
  anonim: 'no',
  nowsend: 'yes',
  fromGift: '',
  who: '',
  datere: '',
  timere: '',
  textGift: '',
  adress: '',
  namePayer: '',
  phonePayer: '',
  emailPayer: '',
  myself: 'no'   
}; 

export const maxPrice = '200000'; // Максимальная стоимость
export const minPrice = '5000'; // Минимальная стоимость

export const stepPrice = '1000';  // Шаг в слайдере

export const formPrice = '#form328806680';  // Форма с полем и слайдером для выбора номинала карты

export const formRecipient = '#form333338756'; // Форма выбора получателя
export const formGiftText = '#form333346474'; // Форма ввода поздравления получателя    
export const formPayer = '#form333366093'; // Форма ввода данных покупателя

export const cartId = '#form337742765'; // Корзина


export const checkDigital = $('#rec333216277 .tn-elem__3332162771625560404672'); 
export const checkOffline = $('#rec333216277 .tn-elem__3332162771625560550712'); 

export const zoneDigital = $('#rec333216277 .tn-elem__3332162771626428690552'); 
export const zoneOffline = $('#rec333216277 .tn-elem__3332162771626428710170'); 

export const pixDigital = $('#rec333216277 .tn-elem__3332162771625560793461'); 
export const pixOffline = $('#rec333216277 .tn-elem__3332162771625559834267'); 

export const checkGreen = $('#rec333332759 .tn-elem__3333327591625560404672'); 
export const checkBlack = $('#rec333332759 .tn-elem__3333327591625560550712'); 

export const zoneGreen = $('#rec333332759 .tn-elem__3333327591626429957304'); 
export const zoneBlack = $('#rec333332759 .tn-elem__3333327591626429957317'); 

export const pixGreen = $('#rec333332759 .tn-elem__3333327591625560793461'); 
export const pixBlack = $('#rec333332759 .tn-elem__3333327591625559834267'); 

export const pixGreenRecipient = $('#rec333338756 .tn-elem__3333387561625560793461'); 
export const pixBlackRecipient = $('#rec333338756 .tn-elem__3333387561627380526832'); 

export const pixGreenText = $('#rec333346474 .tn-elem__3333464741625560793461'); 
export const pixBlackText = $('#rec333346474 .tn-elem__3333464741625559834267'); 


/* Константы страницы активации серта */

export const loaderDiv = $('#rec362404452');

export const greenDesignButton = $('.tn-elem__3400379171627385802797 a'); 
export const blackDesignButton = $('.tn-elem__3400379171627385834399 a'); 
export const numberDesignButton = $('.tn-elem__3400379171627385846446 a'); 
export const activateScreen = $('.tn-elem__3400379171632862044353 a');
export const codeScreen = $('.tn-elem__3400379171633079893637 a');

export const giftActivateRec = $('#rec339597088');
export const nameDiv = $('.tn-elem__3395970881627390855565 .tn-atom');
export const cardDiv = $('.tn-elem__3395970881627293955586 .tn-atom');
export const priceDiv = $('.tn-elem__3395970881627294015760 .tn-atom');
export const textGiftDiv = $('.tn-elem__3395970881627293083160 .tn-atom');

export const pixGreenLogoBor = $('.tn-elem__3395970881627402485931');
export const pixBlackLogoBor = $('.tn-elem__3395970881627294215827');

export const activateButton = $('.tn-elem__3395970881627293744983');
export const callButton = $('.tn-elem__3395970881627462775611');
export const waButton = $('.tn-elem__3395970881627462775618');

