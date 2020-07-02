const lazyTime = require('../index.js');

const suites = [{
  lang: 'en-GB',
  tests: [
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
  ]
}, {
  lang: 'fr-FR',
  tests: [
    [23, 59, 'minuit moins le quart'],
    [0, 0, 'minuit'],
    [0, 15, 'minuit et quart'],
    [0, 30, 'minuit et demi'],
    [0, 45, 'une heure moins le quart'],
    [1, 14, 'une heure'],
    [1, 29, 'une heure et quart'],
    [1, 44, 'une heure et demi'],
    [11, 45, 'midi moins le quart'],
    [12, 0, 'midi'],
    [12, 15, 'midi et quart'],
    [12, 30, 'midi et demi'],
    [12, 45, 'une heure moins le quart']
  ]
}];
const handler = (lang, hours, minutes, expected) => {
  const date = new Date(2018, 10, 23, hours, minutes);
  const result = lazyTime(date, lang);
  test(`${expected}`, () => {
    expect(result).toBe(expected);
  });
};
const formatter = (lang, tests) => tests.map(test => [lang, ...test]);

suites.forEach(({lang, tests}) => {
  describe.each(formatter(lang, tests))('%s: %ih %im', handler);
});

test('no date parameter', () => {
  expect(typeof lazyTime()).toBe('string');
});

test('"date" is Invalid Date', () => {
  expect(typeof lazyTime(new Date('random string'))).toBe('string');
});

test('"date" is a string', () => {
  expect(typeof lazyTime('random string')).toBe('string');
});

test('unknown lang', () => {
  expect(typeof lazyTime(new Date(), null)).toBe('string');
});

test('empty lang', () => {
  expect(typeof lazyTime()).toBe('string');
});
