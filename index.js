'use strict'

const {
  config,
} = require('./src/config')
const {
  ignore,
} = require('./src/ignore')

const operation = process.argv[2];
const action = process.argv[3];
const args = process.argv.slice(4);

const main = {
  config,
  ignore,
};

main[operation](action, args);