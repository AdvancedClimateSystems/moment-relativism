var assert = require('assert');
var moment = require('..');

describe('parse relative ranges', () => {
    it('should throw when the given value is not a range object', () => {
        assert.throws(() => {
            moment.relativism('not an object');
        });
    });
    
    it('should throw when the given range object is not valid', () => {
        assert.throws(() => {
            moment.relativism({
                from: undefined
            });
        });
    });
});
