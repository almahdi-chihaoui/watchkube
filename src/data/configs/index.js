'use strict'

const {
  dataFilePath,
  configData,
} = require('../configurations')

const {
  createConfigData,
} = require('./create');
const {
  listConfigData,
} = require('./list');
const {
  removeConfigData,
} = require('./remove');

const createConfig = (args) => {
  if (
    args.length === 3
    && args[0]
    && args[1]
    && args[2]
  ) {
    const selector = args[0];
    const localDir = args[1];
    const remoteDir = args[2];
    createConfigData(selector, localDir, remoteDir, configData, dataFilePath);
  } else {
    console.error('Wrong arguments, please provide: selector localDir remoteDir');
  }
}

const removeConfig = (args) => {
  if (args.length === 1) {
    const id = Number(args[0]);
    if (!isNaN(id)) {
      removeConfigData(id, configData, dataFilePath);
    } else {
      console.log('Please provide a valid id');
    }
  } else {
    console.error('Wrong arguments, please provide: id');
  }
}

const listConfigs = () => {
  listConfigData(configData);
}

module.exports = {
  createConfig,
  listConfigs,
  removeConfig,
}