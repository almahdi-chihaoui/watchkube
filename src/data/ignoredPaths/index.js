'use strict'

const {
  configData,
  dataFilePath,
} = require('../configurations')

const {
  createIgnoredPathData,
} = require('./create');
const {
  listIgnoredPathsData,
} = require('./list');
const {
  removeIgnoredPathData,
} = require('./remove');

const createIgnoredPath = (args) => {
  if (
    args.length === 1
    && args[0]
  ) {
    const path = args[0];
    createIgnoredPathData(path, configData, dataFilePath);
  } else {
    console.error('Wrong arguments, please provide: path');
  }
}

const removeIgnoredPath = (args) => {
  if (args.length === 1) {
    const id = Number(args[0]);
    if (!isNaN(id)) {
      removeIgnoredPathData(id, configData, dataFilePath);
    } else {
      console.log('Please provide a valid id');
    }
  } else {
    console.error('Wrong arguments, please provide: id');
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