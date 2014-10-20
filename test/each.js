var _ = require('../dist/logen.js');
var co = require('co');
var sleep = require('co-sleep');
var assert = require('assert');

describe('each', function() {
    it('should work with a generator', function(next) {
        var vals = [];
        co(function*() {
            vals.push(1);
            yield _.each([2,3], function*(x) {
                yield sleep(100);
                vals.push(x);
            });
            vals.push(4);
            assert.deepEqual(vals, [1,2,3,4])
            next();
        })();
    });

    it('should work with a function', function(next) {
        var vals = [];
        co(function*() {
            vals.push(1);
            _.each([2,3], function(x) {
                vals.push(x);
            });
            vals.push(4);
            assert.deepEqual(vals, [1,2,3,4])
            next();
        })();
    });
});

