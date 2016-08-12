moment-relativism
=================

[![Build Status](https://travis-ci.org/AdvancedClimateSystems/moment-relativism.svg?branch=master)](https://travis-ci.org/AdvancedClimateSystems/moment-relativism)

Parse a grafana-inspired relative date notation into momentjs instances. Where
"relative" means: relative to `now`.

Usage
-----

Pass in a string in `moment-relativism`'s relative date notation.

```javascript

var moment = require('moment-relativism');
var result = moment.relativism('now-7d');

// logs "Thu Aug 04 2016 16:03:28 GMT+0200" when now is "Thu Aug 11 2016 16:03:28 GMT+0200"
console.log(result.toString());

```

You can also pass in an object. `moment.relativism` will return an object of
the same structure (same fields), but with the values replaced with their
current momentjs equivalent instances.

```javascript

var moment = require('moment-relativism');

// I want the date range for exactly the last 7 days (not rounded).
var range = {
    from: 'now-7d',
    to: 'now'
};

var result = moment.relativism(range);

// logs "Thu Aug 04 2016 16:03:28 GMT+0200" and "Thu Aug 11 2016 16:03:28 GMT+0200"
console.log(result.from.toString(), result.to.toString());

```

Check out the `tests` directory for more detailed usage.

Notation
--------

`moment-relativism`'s notation is based on [grafana's relative date parser](https://github.com/grafana/grafana/blob/56622ee2c6d030efb7b39433b1b1fc6f0e7250a4/public/app/core/utils/rangeutil.ts).
However, grafana's notation does not provide a way to distinguish between
rounding up or rounding down. Instead the rounding character `/` is rounded up
or down based on the context the string is used in. If the string is used as a
"from" date in a date range, it rounds down. Otherwise it rounds down.

`moment-relativism` differs here, as it adds a `\` character for rounding
down. `/` is always used for rounding up.

When adding, subtracting and rounding you can use `moment`'s shorthand keys
for years, days, etc as found in `moment`'s
[documentation](http://momentjs.com/docs/#/manipulating/add/).


Notation   | Result
---------- | ------
`now+1d`   | Add one day to now
`now-1d`   | Subtract one day from now
`now+1d/d` | Add one day to now, round up to end of day
`now-1d\d` | Subtract one day from now, round down to start of day
`now`      | Just returns the date corresponding to now
`now/d`    | Rounds up to todays end of day.
`now\d`    | Rounds down to todays start of day.


License
-------

This software is copyrighted by Advanced Climate Systems bv, and released under
the Mozilla Public License v2.0. See the `LICENSE` file for the entire license.
