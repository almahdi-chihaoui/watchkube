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
  let localDir = args[0];
  const remoteDir = args[1];
  const selectorOption = args.findIndex(arg => arg === '-s');
  const containerNameOption = args.findIndex(arg => arg === '-c');
  const nameSpaceOption = args.findIndex(arg => arg === '-n');
  if (
    localDir
    && remoteDir
    && selectorOption !== -1
  ) {
    localDir = args[0] === '.' ? process.cwd() : args[1];
    const selector = args[selectorOption + 1];
    const containerName = containerNameOption !== -1 ? args[containerNameOption + 1] : '';
    const nameSpace = nameSpaceOption !== -1 ? args[nameSpaceOption + 1] : '';


    createConfigData(selector, localDir, remoteDir, configData, dataFilePath, containerName, nameSpace);
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