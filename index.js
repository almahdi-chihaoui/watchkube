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
  importFile,
} = require('./src/data/importFile')

const {
  startWatching,
} = require('./src/watch')

const {
  version,
} = require('./package.json');

// Get and identify arguments
const operation = process.argv[2];
const action = process.argv[3];
const args = process.argv.slice(4);

// Map commands with functions
const main = {
  import: () => importFile(process.argv[3]),
  config: () => config(action, args),
  help,
  ignore: () => ignore(action, args),
  watch: startWatching,
  version: () => console.log(version),
};

if (Object.keys(main).includes(operation)) {
  // Execute the appropriate function
  main[operation]();
} else {
  // Show unknown command error if the given operation is not found in the main object
  unknownCmd(operation);
  return;
}
