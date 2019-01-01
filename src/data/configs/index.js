'use strict'

const {
  dataFilePath,
  configData,
} = require('../configurations');

const {
  createConfigData,
} = require('./create');
const {
  listConfigData,
} = require('./list');
const {
  removeConfigData,
} = require('./remove');

const {
  configManagerLog,
} = require('../../logger');

const createConfig = (args) => {
  if (
    args.length === 3
    && args[0]
    && args[1]
    && args[2]
  ) {
    const selector = args[0];
    const localDir = args[1] === '.' ? process.cwd() : args[1];
    const remoteDir = args[2];

    createConfigData(selector, localDir, remoteDir, configData, dataFilePath);
  } else {
    configManagerLog('createWrongArgs');
  }
}

const removeConfig = (args) => {
  if (args.length === 1) {
    const id = Number(args[0]);
    if (!isNaN(id)) {
      removeConfigData(id, configData, dataFilePath);
    } else {
      configManagerLog('invalidId');
    }
  } else {
    configManagerLog('removeWrongArgs');
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