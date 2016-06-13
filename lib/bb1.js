const vm = require('vm');

module.exports = class BB1 {
  constructor(executionContext = {}) {
    this.executionContext = executionContext;
    this.functions = {};

    if (!vm.isContext(this.executionContext)) {
      vm.createContext(this.executionContext);
    }

    this.executionContext.listFunctions = () => {
      return Promise.resolve(this.functions);
    };

    this.executionContext.registerFunction = (fn, newName) => {
      this.registerFunction(fn, newName);
    };

    this.executionContext.registerFunctionFromFile = (path, newName) => {
      this.registerFunctionFromFile(path, newName);
    };
  }

  execute(commandString, options = {}) {
    try {
      return vm.runInContext(`Promise.resolve(${commandString})`,
        this.executionContext, options);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  registerFunction(fn, newName) {
    const name = newName ? newName : fn.name;
    this.executionContext[name] = fn.fn;
    this.functions[name] = fn;
  }

  registerFunctionFromFile(path, newName) {
    const fn = require(path);
    this.registerFunction(fn, newName);
  }

  unregisterFunction(name) {
    delete this.functions[name];
  }
};
