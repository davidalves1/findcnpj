#! /usr/bin/env node

'use strict';

const meow = require('meow');

const cli = meow(`
    How to use:
      $ your-cli-command <params>

    Example:
      $ your-cli-command foo

`, {});

var foo = process.argv.slice(2)[0];

console.log(foo);