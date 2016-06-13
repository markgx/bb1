#! /usr/bin/env node

const BB1 = require('..');
const readline = require('readline');
const parseArgs = require('minimist');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const version = require('../package.json').version;

class CLI {
  constructor(args) {
    console.log(`bb1 v.${version}`);
    this.bb1 = new BB1();

    if (args.c) {
      const config = require(args.c);

      if (config.loadFunctions) {
        this.loadFunctions(config.loadFunctions);
      }
    }
  }

  run() {
    this.readLine();
  }

  readLine() {
    rl.question('\n> ', (line) => {
      const command = line.trim();

      if (command === 'exit') {
        return rl.close();
      }

      this.bb1.execute(command).then(console.log).catch((e) => {
        console.log('error: ' + e);
      }).then(() => { this.readLine(); });
    });
  }

  loadFunctions(loadArray) {
    for (const toLoad of loadArray) {
      if (toLoad.file) {
        this.bb1.registerFunctionFromFile(toLoad.file);
      }
    }
  }
}

const argv = parseArgs(process.argv.slice(2));
new CLI(argv).run();
