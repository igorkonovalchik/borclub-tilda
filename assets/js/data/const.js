export const pathname = window.location.pathname;
export const server = `https://bordata.ru`;

// export const popupSpa = '#rec229653342'; /* попап коризны для броинрования */
export const popupSpa = '#rec279462841'; /* Новая корзина  */

export const mainFormSpa = '#rec188259966'; /* форма брони бани на главной */

export const width = document.documentElement.clientWidth;
export const height = document.documentElement.clientHeight;


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

export const podmenus = ['#rec238221915', '#rec238777378','#rec238782757', '#rec263558078', '#rec264691768', '#rec264003331']; /* меню в разделах */
export const globalmenu = LetGlobalMenu; /* главное меню */
