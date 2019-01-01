#! /usr/bin/env node
'use strict'

const {
  help,
  unknownCmd,
} = require('./src/logger');
const {
  config,
} = require('./src/config')
const {
  ignore,
} = require('./src/ignore')
const {
  startWatching,
} = require('./src/watch')

const operation = process.argv[2];
const action = process.argv[3];
const args = process.argv.slice(4);

const main = {
  config,
  help,
  ignore,
  watch: startWatching,
};

if (Object.keys(main).includes(operation)) {
  main[operation](action, args);
} else {
  unknownCmd(operation);
  return;
}
