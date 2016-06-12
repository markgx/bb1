const vm = require('vm');

module.exports = class BB1 {
  constructor(executionContext = {}) {
    this.executionContext = executionContext;

    this.functions = {};
    this.executionContext.listFunctions = () => {
      return Promise.resolve(this.functions);
    };

    if (!vm.isContext(this.executionContext)) {
      vm.createContext(this.executionContext);
    }
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
    this.executionContext[name] = fn.command;
    this.functions[name] = fn;
  }
};
