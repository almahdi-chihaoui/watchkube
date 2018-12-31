'use strict'
const {
  help,
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

main[operation](action, args);
