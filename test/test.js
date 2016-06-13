const assert = require('chai').assert;
const path = require('path');
const BB1 = require('..');

describe('BB1', function() {
  const testFilepath = path.resolve(`${__dirname}/fixtures/test-function`);

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

    it('should add the given function with the specified name', function() {
      const bb1 = new BB1();
      bb1.registerFunction(someFunction, 'anotherName');
      assert.equal(someFunction, bb1.functions['anotherName']);
    });
  });

  describe('#registerFunctionFromFile', function() {
    it('should register a function from a file given a valid path', function() {
      const bb1 = new BB1();
      const fn = require(testFilepath);
      bb1.registerFunctionFromFile(testFilepath);
      assert.equal(fn, bb1.functions[fn.name]);
    });

    it('should register a function from a file with the specified name', function() {
      const bb1 = new BB1();
      const fn = require(testFilepath);
      bb1.registerFunctionFromFile(testFilepath, 'anotherName');
      assert.equal(fn, bb1.functions['anotherName']);
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
