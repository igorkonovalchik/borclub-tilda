import moment from '../../../../plugins/moment/moment'

export const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

export const unique = (arr) => {
  return Array.from(new Set(arr));
};

export const getMax = (arr) => Math.max.apply(null, arr);

export const sec2time = (timeInSeconds) => {
  let pad = function(num, size) { return ('000' + num).slice(size * -1); },
  time = parseFloat(timeInSeconds).toFixed(3),
  minutes = Math.floor(time / 60) % 60,
  seconds = Math.floor(time - minutes * 60);
  return pad(minutes, 2) + ':' + pad(seconds, 2);
};

export const getMonth = (date) => {
  let result = '';
  if(typeof date === 'object'){
    const entries = Object.entries(date);
    for(const [key, value] of entries) {
      value.forEach((item) => {
      	item = item + 1;
      	if(item < 10){ item = '0' + item; };
        result += key + '-' + item + ';';
      });
    };
    result = result.substring(0, result.length - 1);
  }else{
  date = new Date(date);
  const dateM = moment(date); 
  result = dateM.format('YYYY-MM');
};
  return result;
};