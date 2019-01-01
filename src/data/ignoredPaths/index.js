'use strict'

const path = require('path');

const {
  configData,
  dataFilePath,
} = require('../configurations');

const {
  createIgnoredPathData,
} = require('./create');
const {
  listIgnoredPathsData,
} = require('./list');
const {
  removeIgnoredPathData,
} = require('./remove');

const {
  ignoredPathManagerLog,
} = require('../../logger');

const createIgnoredPath = (args) => {
  if (
    args.length === 1
    && args[0]
  ) {
    const ignoredPath = args[0].startsWith('.')
      ? path.join(process.cwd(), args[0].slice(1))
      : args[0];
    createIgnoredPathData(ignoredPath, configData, dataFilePath);
  } else {
    ignoredPathManagerLog('createWrongArgs');
  }
}

const removeIgnoredPath = (args) => {
  if (args.length === 1) {
    const id = Number(args[0]);
    if (!isNaN(id)) {
      removeIgnoredPathData(id, configData, dataFilePath);
    } else {
      ignoredPathManagerLog('invalidId');
    }
  } else {
    ignoredPathManagerLog('removeWrongArgs');
  }
}

const listIgnoredPaths = () => {
  listIgnoredPathsData(configData);
}

module.exports = {
  createIgnoredPath,
  listIgnoredPaths,
  removeIgnoredPath,
}