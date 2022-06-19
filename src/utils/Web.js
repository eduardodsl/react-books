import defaultLang from '../services/LocaleService/locale.en.json';

/**
 * fetches json data from a request
 * @param {string} url - url to fetch
 * @param {function} onFail - callback function if the request fails
 * @returns {object}
 * usage:
 * ```javascript
 * getJson('https://site.com.br', error => handleMyError(error));
 * ```
 * or:
 * ```javascript
 * try {
 *  getJson('https://site.com.br');
 * }catch (e) {
 *  handleMyError(e);
 * }
 * ```
 */
export const getJson = async (url, onFail) => {
    try {
        const res = await fetch(url);
        return res.json();
    } catch (e) {
        if(onFail){
            return onFail(e);
        }else{
            throw e;
        }
    }
};

export const defaultLocale = defaultLang;

/**
 * fetches json data from localization files
 * @param {string} lang - language code: en (English), pt (Portuguese), or zh (Mandarin)
 * @param {function} onFail - callback function if the request fails, first parameter is the error message, second is the system default localization
 * @returns {object}
 * usage:
 * ```javascript
 * getLocale('en', error => handleMyError(error));
 * ```
 * or:
 * ```javascript
 * try {
 *  getLoale('en');
 * }catch (e) {
 *  handleMyError(e);
 * }
 * ```
 */
export const getLocale = async (lang, onFail) => {
    try{
        const data = await import(`../services/LocaleService/locale.${lang}.json`);
        return data.default;
    } catch (e) {
        if(onFail) {
            return onFail(e, defaultLocale);
        }else{
            throw e;
        }
    }
};

/**
 * Converts a date to a specific string
 * @param {Date} date - the date object to convert
 * @param {array} monthArray - the list of localized months 
 * @param {string} format - the string format to covert, it must contain %d (day), %m (month) and %y (year)
 */
export const makeDate = (date, format, monthArray) => {

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let textMonth;
    if(monthArray){
        textMonth = monthArray[month];
    }

    const dateString = format.replace("%d", day).replace("%m", textMonth ? textMonth : month).replace("%y", year);    
    
    return dateString;


}

export const replaceString = (text, template) => {
    return template.replace("%s", text);
}