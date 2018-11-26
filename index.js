const data = require('./data.json');

/**
 * Formats time into verbose, lazy time.
 *
 * @param {Date} [date=new Date()] - Date to format into lazy format.
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
 * lazyTime(now);
 * // => quarter past four
 */
module.exports = function (date = new Date()) {
  const hour = date.getHours();
  const quarter = Math.floor(date.getMinutes() / 15);
  const newHour = quarter === 3 ? hour + 1 : hour;
  const index = newHour % 12;
  const output = [];

  if ([0,24].includes(newHour)) {
    output.push(data.hours[0].split('|')[0]);
  } else if (newHour === 12) {
    output.push(data.hours[0].split('|')[1]);
  } else {
    output.push(data.hours[index]);

    if (quarter === 0) {
      output.push(data.quarters[0]);
    }
  }

  if (quarter !== 0) {
    output.unshift(data.quarters[quarter]);
  }

  return output.join(' ');
};
