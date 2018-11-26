const data = require('./data.json');

const getVerboseHour = (hour, quarter) => {
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
      output.push(getVerboseQuarter(quarter))
    }
  }

  return output.join(' ');
};
const getVerboseQuarter = quarter => data.quarters[quarter];

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
 * lazyTime();
 * // => quarter past four
 *
 * lazyTime(new Date(2018, 10, 25, 23, 45))
 * // => quarter till midnight
 */
module.exports = function (date) {
  if (typeof date === 'undefined') {
    date = new Date();
  }
  if (
    Object.prototype.toString.call(date) !== '[object Date]'
    || Number.isNaN(date.getDate())
  ) {
    throw new TypeError('"date" is not a date');
  }
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const quarter = Math.floor(minutes / 15);
  const output = [getVerboseHour(hour, quarter)];

  if (quarter !== 0) {
    output.unshift(getVerboseQuarter(quarter));
  }

  return output.join(' ');
};
