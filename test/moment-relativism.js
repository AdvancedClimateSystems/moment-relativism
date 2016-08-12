var assert = require('assert');
var sinon = require('sinon');
var moment = require('..');

// Always use the same value for "now", thanks to sinon's timer mocking.
var NOW = 1470927160;

describe('moment-relativism', () => {
    var clock;

    before(() => {
        clock = sinon.useFakeTimers(NOW);
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
            assert.equals(range.unix(), NOW);
        });

        it('should parse exact millisecond subtractions like now-100ms', () => {
            let result =  moment.relativism('now-100ms');
            let from = moment().subtract(100, 'ms').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact millisecond additions like now+100ms', () => {
            let result = moment.relativism('now+100ms');
            let from = moment().add(100, 'ms').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact second subtractions like now-45s', () => {
            let result = moment.relativism('now-45s');
            let from = moment().subtract(45, 's').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact second additions like now+45s', () => {
            let result = moment.relativism('now+45s');
            let from = moment().add(45, 's').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact minute subtractions like now-30m', () => {
            let result = moment.relativism('now-30m');
            let from = moment().subtract(30, 'm').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact minute additions like now+30m', () => {
            let result = moment.relativism('now+30m');
            let from = moment().add(30, 'm').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact hour subtractions like now-5h', () => {
            let result = moment.relativism('now-5h');
            let from = moment().subtract(5, 'h').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact hour additions like now+5h', () => {
            let result = moment.relativism('now+5h');
            let from = moment().add(5, 'h').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact day subtractions like now-7d', () => {
            let result = moment.relativism('now-7d');
            let from = moment().subtract(7, 'd').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact day additions like now+7d', () => {
            let result = moment.relativism('now+7d');
            let from = moment().add(7, 'd').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact week subtractions like now-1w', () => {
            let result = moment.relativism('now-1w');
            let from = moment().subtract(1, 'w').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact week additions like now+1w', () => {
            let result = moment.relativism('now+1w');
            let from = moment().add(1, 'w').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact month subtractions like now-1M', () => {
            let result = moment.relativism('now-1M');
            let from = moment().subtract(1, 'M').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact month additions like now+1M', () => {
            let result = moment.relativism('now+1M');
            let from = moment().add(1, 'M').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact quarter subtractions like now-1Q', () => {
            let result = moment.relativism('now-1Q');
            let from = moment().subtract(1, 'Q').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact quarter additions like now+1Q', () => {
            let result = moment.relativism('now+1Q');
            let from = moment().add(1, 'Q').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact year subtractions like now-1y', () => {
            let result = moment.relativism('now-1y');
            let from = moment().subtract(1, 'y').unix();
            assert.equals(result.unix(), from.unix());
        });

        it('should parse exact year additions like now+1y', () => {
            let result = moment.relativism('now+1y');
            let from = moment().add(1, 'y').unix();
            assert.equals(result.unix(), from.unix());
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
                let result = moment.relativism('now\d');
                let from = moment().startOf('d');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil without subtraction or addition', () => {
                let result = moment.relativism('now/d')
                let to = moment().endOf('d');
                assert.equals(result.unix(), from.unix());
            });
        });

        describe('seconds', () => {
            it('should floor to the nearest second', () => {
                let result = moment.relativism('now-1d\s');
                let from = moment().subtract(1, 'd').startOf('s');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil to the nearest second', () => {
                let result = moment.relativism('now-1/s')
                let to = moment().subtract(1, 'd').endOf('s');
                assert.equals(result.unix(), from.unix());
            });
        });

        describe('minutes', () => {
            it('should floor to the nearest minute', () => {
                let result = moment.relativism('now-1d\m');
                let from = moment().subtract(1, 'd').startOf('m');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil to the nearest minute', () => {
                let result = moment.relativism('now-1d/m')
                let to = moment().subtract(1, 'd').endOf('m');
                assert.equals(result.unix(), from.unix());
            });
        });

        describe('hours', () => {
            it('should floor to the nearest hour', () => {
                let result = moment.relativism('now-1d\h');
                let from = moment().subtract(1, 'd').startOf('h');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil to the nearest hour', () => {
                let result = moment.relativism('now-1d/h')
                let to = moment().subtract(1, 'd').endOf('h');
                assert.equals(result.unix(), from.unix());
            });
        });

        describe('days', () => {
            it('should floor to the nearest day', () => {
                let result = moment.relativism('now-1d\d');
                let from = moment().subtract(1, 'd').startOf('d');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil to the nearest day', () => {
                let result = moment.relativism('now-1d/d')
                let to = moment().subtract(1, 'd').endOf('d');
                assert.equals(result.unix(), from.unix());
            });
        });

        describe('weeks', () => {
            it('should floor to the nearest week', () => {
                let result = moment.relativism('now-1d\w');
                let from = moment().subtract(1, 'd').startOf('w');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil to the nearest week', () => {
                let result = moment.relativism('now-1d/w')
                let to = moment().subtract(1, 'd').endOf('w');
                assert.equals(result.unix(), from.unix());
            });
        });

        describe('months', () => {
            it('should floor to the nearest month', () => {
                let result = moment.relativism('now-1M\M');
                let from = moment().subtract(1, 'd').startOf('M');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil to the nearest month', () => {
                let result = moment.relativism('now-1M/M')
                let to = moment().subtract(1, 'd').endOf('M');
                assert.equals(result.unix(), from.unix());
            });
        });

        describe('quarters', () => {
            it('should floor to the nearest quarter', () => {
                let result = moment.relativism('now-1M\Q');
                let from = moment().subtract(1, 'd').startOf('Q');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil to the nearest quarter', () => {
                let result = moment.relativism('now-1M/Q')
                let to = moment().subtract(1, 'd').endOf('Q');
                assert.equals(result.unix(), from.unix());
            });
        });

        describe('years', () => {
            it('should floor to the nearest year', () => {
                let result = moment.relativism('now-1M\y');
                let from = moment().subtract(1, 'd').startOf('y');
                assert.equals(result.unix(), from.unix());
            });

            it('should ceil to the nearest quarter', () => {
                let result = moment.relativism('now-1M/y')
                assert.equals(result.unix(), from.unix());
            });
        });
    });
});
