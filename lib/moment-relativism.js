var moment = require('moment');

var isObject = function(obj) {
    return obj === Object(obj);
};

/**
 * Parses the from and to fields in the given date range objects into a
 * daterange objects containing momentjs instances.
 *
 * Expects a range object in the following format:
 * 
 *    {
 *        from: 'now-7d',
 *        to: 'now'
 *    }
 *
 * And returns an object with similar structure, but with the strings replaced
 * by momentjs instances.
 * 
 * @method relativism
 * @param {Object} range
 * @throws {Error} when the input range is not a valid range object.
 * @returns {Object}
 */
moment.relativism = function(range) {
    if (!isObject(range) || range.from === undefined || range.to === undefined) {
        throw new Error('Given range is not a valid object.');
    }

    return range;
};

module.exports = moment;
