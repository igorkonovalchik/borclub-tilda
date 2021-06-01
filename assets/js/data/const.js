import { dopGuests } from '../../../../../../../territoria/bordata.ru/public_html/src/assets/js/data/const';
import moment from '../../../../plugins/moment/moment'

export const pathname = window.location.pathname;
export const server = `https://bordata.ru`;

export const popupSpa = '#rec229653342'; /* попап коризны для броинрования. Все поля корзины в spaCart */

let varPopupSpa = '#rec279462841';
export const newPopupSpa = varPopupSpa; /* Новая корзина  */

export const activeYclients = false; 

export const maxDaysVisible = 180; 
export const morningHourOpen = 11;
export const weekendMorningHourOpen = 9;
export const lastHourBook = 20; 
export const dopFreeGuestsId = 7023060; 
export const dopGuestsId = 7023051; 
export const dopGuestsPrice = 6000; 

let varMainFormSpa = '#rec279462841';
varMainFormSpa = '#rec188259966';
export const mainFormSpa = varMainFormSpa; /* форма брони бани на главной */

export const $main_time_field = $(varMainFormSpa + " input[name*='time']");
export const $main_date_field = $(varMainFormSpa + " input[name*='date']");
export const $main_day_field = $(varMainFormSpa + " input[name*='day']");

export const width = document.documentElement.clientWidth;
export const height = document.documentElement.clientHeight;

const Cartrumoment = moment();
Cartrumoment.locale('ru');
const currentTime = Number(Cartrumoment.format('HHmm'));
const days = currentTime < 2230 ? 1 : 2; 
let date = Cartrumoment.add(days,'days');             
export const nextDay = date.format('YYYY/MM/DD'); 
export const fistDayBook = days;

let LetisSmall = false;
let LetisMedium = false;
let LetisLarge = false;
let LetisXLarge = false;
let LetfileName = 'large';
let LetpicSize = 'M';


if(width < 768){
    LetisSmall = true;
    LetfileName = 'small';
    LetpicSize = 'S';
}else{
    if(width > 767 && width < 1068){
        LetisMedium = true;
        LetfileName = 'medium';
        }else{
            if(width > 1067 && width < 1440){
                LetisLarge = true;
            }else{
                LetisXLarge = true;
                LetfileName = 'xlarge';
                LetpicSize = 'X'; };
    };
};

export const isSmall = LetisSmall;
export const isMedium = LetisMedium;
export const isLarge = LetisLarge;
export const isXLarge = LetisXLarge;
export const fileName = LetfileName;
export const picSize = LetpicSize;

let LetGlobalMenu = !LetisSmall?'#rec205090460':'#rec205099373';

export const podmenus = ['#rec292549410', '#rec238221915', '#rec238777378','#rec238782757', '#rec263558078', '#rec283030530', '#rec264691768', '#rec264003331']; /* меню в разделах */
export const globalmenu = LetGlobalMenu; /* главное меню */


/* поля корзины */

export const $price_field = $(varPopupSpa + " input[name*='price']"); 
export const $id_field = $(varPopupSpa + " input[name*='id']");
export const $day_field = $(varPopupSpa + " input[name*='day']");
export const $time_field = $(varPopupSpa + " input[name*='time']");
export const $date_field = $(varPopupSpa + " input[name*='date']");
export const $services_field = $(varPopupSpa + " input[name*='allServices']");
export const $spa_field = $(varPopupSpa + " select[name*='spa']");
export const $seance_length_field = $(varPopupSpa + " input[name*='seanceLength']");
export const $persons_field = $(varPopupSpa + " input[name*='persons']"); 
export const $dopHour_field = $(varPopupSpa + " input[name*='dopHour']");
export const $picker__table = $(varPopupSpa + " .picker__table");
export const $picker__list = $(varPopupSpa + " .picker__list");
export const $submit = $(varPopupSpa + " :submit");
export const $selectSpa_field = $(varPopupSpa + " select[name*='spa'] option:selected");
export const $spaTitle = $(varPopupSpa + ' .t706__cartwin-heading'); 

export const $email_field = $(varPopupSpa + " .t-input-group_em");
export const $cash_field = $(varPopupSpa + " .t-input-group_pm .t-radio__control:first-child");
export const $sber_field = $(varPopupSpa + " .t-input-group_pm .t-radio__control:last-child");

export const priceId = 'price' + varPopupSpa.slice(4);
