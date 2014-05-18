/*global require, exports */
var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.cordovacli = {
    setUp: function (done) {
        'use strict';
        // setup here if necessary
        done();
    },
    cordova_test: function (test) {
        'use strict';
        test.expect(4);

        var expected = true;
        var actual;

        actual = grunt.file.isDir("myHybridAppFolder");
        test.equal(actual, expected, 'should create a cordova project root folder');

        actual = grunt.file.isDir("myHybridAppFolder/platforms");
        test.equal(actual, expected, 'should create a cordova project folder structure');

        actual = grunt.file.isDir("myHybridAppFolder/plugins");
        test.equal(actual, expected, 'should create a cordova project folder structure');

        actual = grunt.file.isDir("myHybridAppFolder/www");
        test.equal(actual, expected, 'should create a cordova project folder structure');

        test.done();
    }
};
