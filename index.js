const languages = require('./i18n.json');
const defaultLang = 'en-GB';

const getLanguageSet = lang => languages[lang] || languages[defaultLang];
const getVerboseHour = (hour, quarter, set) => {
  const newHour = quarter === 3 ? hour + 1 : hour;
  const index = newHour % 12;
  const output = [];

  if ([0,24].includes(newHour)) {
    output.push(set.hours[0].split('|')[0]);
  } else if (newHour === 12) {
    output.push(set.hours[0].split('|')[1]);
  } else {
    output.push(set.hours[index]);

    if (quarter === 0 || !set.simpleHours) {
      output.push(getVerboseQuarter(0, set));
    }
  }

  return output.join(' ');
};
const getInsertMethod = ({quartersBeforeHours}) => quartersBeforeHours ? 'unshift' : 'push';
const getVerboseQuarter = (quarter, {quarters}) => quarters[quarter];


/**
 * Formats time into verbose, lazy time.
 *
 * @param {Date} [date=new Date()] - Date to format into lazy format.
 * @param {String} [lang='en-GB'] - Country code.
 * @return {string} Representation of time in lazy format.
 *
 * @example
 *
 * const lazyTime = require('lazy-time');
 * const now = new Date();
 *
 * console.log(now);
 * // => Sun Nov 25 2018 16:24:05 GMT-0800 (Pacific Standard Time)
 *
 * lazyTime();
 * // => quarter past four
 *
 * lazyTime(new Date(2018, 10, 25, 23, 45))
 * // => quarter till midnight
 *
 * lazyTime(new Date(2018, 10, 25, 23, 45), 'fr-FR')
 * // => minuit moins le quart
 */
module.exports = (date = new Date(), lang = defaultLang) => {
  if (
    Object.prototype.toString.call(date) !== '[object Date]'
    || Number.isNaN(date.getDate())
  ) {
    date = new Date();
  }
  const set = getLanguageSet(lang);
  const hour = date.getHours();
  const quarter = Math.floor(date.getMinutes() / 15);
  const output = [getVerboseHour(hour, quarter, set)];

  if (quarter !== 0) {
    output[getInsertMethod(set)](getVerboseQuarter(quarter, set));
  }

  return output.join(' ');
};
