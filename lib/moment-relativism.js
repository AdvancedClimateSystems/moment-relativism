var moment = require('moment');

var isObject = function(obj) {
     return obj === Object(obj);
};

var isString = function(str) {
    return Object.prototype.toString.call(str) === '[object String]';
};

var units = ['y', 'Q', 'M', 'w', 'd', 'h', 'm', 's', 'ms'];
var checkValidUnit = function(unit) {
    if (units.indexOf(unit) === -1) {
        throw new Error("Unit " + unit + " is not a valid unit.");
    }
};

var parseObj = function(obj) {
    var result = {};

    // For some reason, Object.values has only been added to the spec in
    // ECMAScript 2017...
    Object
        .keys(obj)
        .forEach(function(key) {
            result[key] = parseStr(obj[key]);
        });

    return result;
};

var buildMoment = function(relativism) {
    var now = moment();

    if (relativism.operator === '+') {
        now = now.add(relativism.amount, relativism.unit);
    } else if (relativism.operator === '-') {
        now = now.subtract(relativism.amount, relativism.unit);
    }

    if (relativism.round.to === '|') {
        now = now.startOf(relativism.round.unit);
    } else if (relativism.round.to === '/') {
        now = now.endOf(relativism.round.unit);
    }

    return now;
};

var regex = /([\+|\-])(\d+(\.\d+)?)(\w+)(([\|,\/])(\w+))?/;

var parseStr = function(str) {
    var relativism;

    if (str === 'now') {
        return moment();
    }

    // Remove "now" from the string and parse the remaining characters.
    var rest = str.substring('now'.length);

    // Only round the current date down.
    if (rest[0] === '|') {
        return buildMoment({
            round: {
                to: '|',
                unit: rest.substr(1)
            }
        });
    }
        
    // Only round the current date up.
    if (rest[0] === '/') {
        return buildMoment({
            round: {
                to: '/',
                unit: rest.substr(1)
            }
        });
    }

    // Match the entire string and unpack the groups into logical variables.
    // Would be nice to have array unpacking here, alas.
    var matches = str.match(regex);
    return buildMoment({
        operator: matches[1],
        amount: matches[2],
        unit: matches[4],
        round: {
            to: matches[6],
            unit: matches[7]
        }
    });
};

moment.relativism = function(relative) {
    var func;

    if (isObject(relative)) {
        return parseObj(relative);
    }
    
    if (isString(relative)) {
        return parseStr(relative);
    }

    // Throw an error when the given range isn't an object or a string.
    throw new Error('Given range is not a string or an object containing strings.');
};

module.exports = moment;
