#! /usr/bin/env node

const BB1 = require('..');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const version = require('../package.json').version;

class CLI {
  constructor() {
    console.log(`bb1 v.${version}`);
    this.bb1 = new BB1();
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
}

new CLI().run();
