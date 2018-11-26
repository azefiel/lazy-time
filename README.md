# lazy-clock [![Build Status](https://travis-ci.org/azefiel/lazy-time.svg?branch=master)](https://travis-ci.org/azefiel/lazy-time) [![Coverage Status](https://coveralls.io/repos/github/azefiel/lazy-time/badge.svg?branch=master)](https://coveralls.io/github/azefiel/lazy-time?branch=master)

A standalone package to format time into verbose, lazy time.

## Syntax
```javascript
lazyTime([date]);
```

### Parameters
Key | Description | Type | Default | Required
:-: | --- | :-: | :-: | :-:
`date` | Date to format into verbose, lazy format. | `Date` | `new Date()` | `false`

### Return value
A `String` representing the date in verbose, lazy format.

## Install
```shell
npm install lazy-time
```

## Examples
```javascript
const lazyTime = require('lazy-time');

lazyTime(new Date(2018, 10, 3, 23, 59));
// => quarter till midnight

lazyTime(new Date(2018, 10, 3, 0, 0));
// => midnight

lazyTime(new Date(2018, 10, 3, 0, 15));
// => quarter past midnight

lazyTime(new Date(2018, 10, 3, 0, 30));
// => half past midnight

lazyTime(new Date(2018, 10, 3, 0, 45));
// => quarter till one

lazyTime(new Date(2018, 10, 3, 1, 14));
// => one o'clock

lazyTime(new Date(2018, 10, 3, 11, 45));
// => quarter till noon

lazyTime(new Date(2018, 10, 3, 12, 0));
// => noon

lazyTime(new Date(2018, 10, 3, 12, 29));
// => quarter past midnight

lazyTime(new Date(2018, 10, 3, 12, 44));
// => half past noon

lazyTime(new Date(2018, 10, 3, 12, 59));
// => quarter till one
```
