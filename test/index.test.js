const lazyTime = require('../index.js');

const tests = [
  [23, 59, 'quarter till midnight'],
  [0, 0, 'midnight'],
  [0, 15, 'quarter past midnight'],
  [0, 30, 'half past midnight'],
  [0, 45, 'quarter till one'],
  [1, 14, 'one o\'clock'],
  [1, 29, 'quarter past one'],
  [1, 44, 'half past one'],
  [11, 45, 'quarter till noon'],
  [12, 0, 'noon'],
  [12, 15, 'quarter past noon'],
  [12, 30, 'half past noon'],
  [12, 45, 'quarter till one']
];

tests.forEach(val => {
  const date = new Date(2018, 10, 25, val[0], val[1]);
  const result = lazyTime(date);
  test(`${val[0]}h ${val[1]}m -> ${val[2]}`, () => {
    expect(result).toBe(val[2]);
  });
});

test('no date parameter', () => {
  expect(typeof lazyTime()).toBe('string');
});

test('"date" is not a date => invalid date', () => {
  expect(() => {
    lazyTime(new Date('random string'));
  }).toThrowError('"date" is not a date');
});

test('"date" is not a date => not a date', () => {
  expect(() => {
    lazyTime('random string');
  }).toThrowError('"date" is not a date');
});
