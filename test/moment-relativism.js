var assert = require('assert');
var sinon = require('sinon');
var moment = require('..');

// Always use the same value for "now", thanks to sinon's timer mocking.
var NOW = 1470927160;

describe('moment-relativism', () => {
    var clock;

    before(() => {
        clock = sinon.useFakeTimers(NOW * 1000);
    });

    after(() => {
        clock.restore();
    });

    describe('sanity checks', () => {
        it('should throw when the given value is not a string or an object', () => {
            assert.throws(() => moment.relativism(undefined));
        });

        it('should throw when the given value is an invalid string', () => {
            assert.throws(() => moment.relativism('not a valid string'))
        });

        it('should throw when the given object contains an invalid string', () => {
            assert.throws(() => moment.relativism({
                from: 'not a valid string',
                to: 'now'
            }));
        });
    });

    describe('strings', () => {
        it('should parse "now" into the exact current datetime', () => {
            let result = moment.relativism('now');
            assert.equal(result.unix(), NOW);
        });

        it('should parse exact millisecond subtractions like now-100ms', () => {
            let result =  moment.relativism('now-100ms');
            let expected = moment().subtract(100, 'ms');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact millisecond additions like now+100ms', () => {
            let result = moment.relativism('now+100ms');
            let expected = moment().add(100, 'ms');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact second subtractions like now-45s', () => {
            let result = moment.relativism('now-45s');
            let expected = moment().subtract(45, 's');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact second additions like now+45s', () => {
            let result = moment.relativism('now+45s');
            let expected = moment().add(45, 's');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact minute subtractions like now-30m', () => {
            let result = moment.relativism('now-30m');
            let expected = moment().subtract(30, 'm');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact minute additions like now+30m', () => {
            let result = moment.relativism('now+30m');
            let expected = moment().add(30, 'm');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact hour subtractions like now-5h', () => {
            let result = moment.relativism('now-5h');
            let expected = moment().subtract(5, 'h');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact hour additions like now+5h', () => {
            let result = moment.relativism('now+5h');
            let expected = moment().add(5, 'h');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact day subtractions like now-7d', () => {
            let result = moment.relativism('now-7d');
            let expected = moment().subtract(7, 'd');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact day additions like now+7d', () => {
            let result = moment.relativism('now+7d');
            let expected = moment().add(7, 'd');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact week subtractions like now-1w', () => {
            let result = moment.relativism('now-1w');
            let expected = moment().subtract(1, 'w');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact week additions like now+1w', () => {
            let result = moment.relativism('now+1w');
            let expected = moment().add(1, 'w');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact month subtractions like now-1M', () => {
            let result = moment.relativism('now-1M');
            let expected = moment().subtract(1, 'M');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact month additions like now+1M', () => {
            let result = moment.relativism('now+1M');
            let expected = moment().add(1, 'M');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact quarter subtractions like now-1Q', () => {
            let result = moment.relativism('now-1Q');
            let expected = moment().subtract(1, 'Q');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact quarter additions like now+1Q', () => {
            let result = moment.relativism('now+1Q');
            let expected = moment().add(1, 'Q');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact year subtractions like now-1y', () => {
            let result = moment.relativism('now-1y');
            let expected = moment().subtract(1, 'y');
            assert.equal(result.unix(), expected.unix());
        });

        it('should parse exact year additions like now+1y', () => {
            let result = moment.relativism('now+1y');
            let expected = moment().add(1, 'y');
            assert.equal(result.unix(), expected.unix());
        });
    });

    describe('objects', () => {
        it('should return a new object with the same structure, but with momentjs instances', () => {
            let result = moment.relativism({
                from: 'now-1d',
                to: 'now'
            });
            
            assert.ok(moment.isMoment(result.from));
            assert.ok(moment.isMoment(result.to));
        });
    });

    describe('rounding', () => {
        describe('now', () => {
            it('should floor without subtraction or addition', () => {
                let result = moment.relativism('now\\d');
                let expected = moment().startOf('d');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil without subtraction or addition', () => {
                let result = moment.relativism('now/d')
                let expected = moment().endOf('d');
                assert.equal(result.unix(), expected.unix());
            });
        });

        describe('seconds', () => {
            it('should floor to the nearest second', () => {
                let result = moment.relativism('now-1d\\s');
                let expected = moment().subtract(1, 'd').startOf('s');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil to the nearest second', () => {
                let result = moment.relativism('now-1d/s')
                let expected = moment().subtract(1, 'd').endOf('s');
                assert.equal(result.unix(), expected.unix());
            });
        });

        describe('minutes', () => {
            it('should floor to the nearest minute', () => {
                let result = moment.relativism('now-1d\\m');
                let expected = moment().subtract(1, 'd').startOf('m');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil to the nearest minute', () => {
                let result = moment.relativism('now-1d/m')
                let expected = moment().subtract(1, 'd').endOf('m');
                assert.equal(result.unix(), expected.unix());
            });
        });

        describe('hours', () => {
            it('should floor to the nearest hour', () => {
                let result = moment.relativism('now-1d\\h');
                let expected = moment().subtract(1, 'd').startOf('h');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil to the nearest hour', () => {
                let result = moment.relativism('now-1d/h')
                let expected = moment().subtract(1, 'd').endOf('h');
                assert.equal(result.unix(), expected.unix());
            });
        });

        describe('days', () => {
            it('should floor to the nearest day', () => {
                let result = moment.relativism('now-1d\\d');
                let expected = moment().subtract(1, 'd').startOf('d');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil to the nearest day', () => {
                let result = moment.relativism('now-1d/d')
                let expected = moment().subtract(1, 'd').endOf('d');
                assert.equal(result.unix(), expected.unix());
            });
        });

        describe('weeks', () => {
            it('should floor to the nearest week', () => {
                let result = moment.relativism('now-1d\\w');
                let expected = moment().subtract(1, 'd').startOf('w');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil to the nearest week', () => {
                let result = moment.relativism('now-1d/w')
                let expected = moment().subtract(1, 'd').endOf('w');
                assert.equal(result.unix(), expected.unix());
            });
        });

        describe('months', () => {
            it('should floor to the nearest month', () => {
                let result = moment.relativism('now-1M\\M');
                let expected = moment().subtract(1, 'M').startOf('M');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil to the nearest month', () => {
                let result = moment.relativism('now-1M/M')
                let expected = moment().subtract(1, 'M').endOf('M');
                assert.equal(result.unix(), expected.unix());
            });
        });

        describe('quarters', () => {
            it('should floor to the nearest quarter', () => {
                let result = moment.relativism('now-1M\\Q');
                let expected = moment().subtract(1, 'M').startOf('Q');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil to the nearest quarter', () => {
                let result = moment.relativism('now-1M/Q')
                let expected = moment().subtract(1, 'M').endOf('Q');
                assert.equal(result.unix(), expected.unix());
            });
        });

        describe('years', () => {
            it('should floor to the nearest year', () => {
                let result = moment.relativism('now-1M\\y');
                let expected = moment().subtract(1, 'M').startOf('y');
                assert.equal(result.unix(), expected.unix());
            });

            it('should ceil to the nearest year', () => {
                let result = moment.relativism('now-1M/y')
                let expected = moment().subtract(1, 'M').endOf('y');
                assert.equal(result.unix(), expected.unix());
            });
        });
    });
});
