const assert = require('chai').assert;
const path = require('path');
const BB1 = require('..');

describe('BB1', function() {
  describe('#constructor', function() {
  });

  describe('#execute', function() {
  });

  const someFunction = {
    name: 'someFunction',
    fn: function() { return 'hi'; }
  };

  describe('#registerFunction', function() {
    it('should add the given function to the functions instance variable', function() {
      const bb1 = new BB1();
      bb1.registerFunction(someFunction);
      assert.equal(someFunction, bb1.functions.someFunction);
    });
  });

  describe('#registerFunctionFromFile', function() {
    it('should register a function from a file given a valid path', function() {
      const bb1 = new BB1();
      const filepath = path.resolve(`${__dirname}/fixtures/test-function`);
      const fn = require(filepath);
      bb1.registerFunctionFromFile(filepath);
      assert.equal(fn, bb1.functions[fn.name]);
    });
  });

  describe('#unregisterFunction', function() {
    it('should remove the named function from the functions instance variable', function() {
      const bb1 = new BB1();
      bb1.registerFunction(someFunction);
      bb1.unregisterFunction(someFunction.name);
      assert.equal(null, bb1.functions[someFunction.name]);
    });
  });
});
