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
    args[0]
    && args[1]
    && args[2]
  ) {
    const localDir = args[0] === '.' ? process.cwd() : args[1];
    const remoteDir = args[1];
    const selector = args[2];
    const containerName = args[3] || ''; 

    createConfigData(selector, localDir, remoteDir, configData, dataFilePath, containerName);
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