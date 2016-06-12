const assert = require('chai').assert;
const BB1 = require('..');

describe('BB1', function() {
  describe('constructor', function() {
  });

  describe('#execute', function() {
  });

  describe('#registerFunction', function() {
    it('should add itself to the commands instance variable', function() {
      const bb1 = new BB1();

      const someFunction = {
        name: 'someFunction',
        fn: function() { return 'hi'; }
      };

      bb1.registerFunction(someFunction);
      assert.equal(someFunction, bb1.functions.someFunction);
    });
  });
});
