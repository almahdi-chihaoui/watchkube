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

/**
 * Add a new config, it get the config's data from the arguments of the cli command (wtachkube config add) and execute the createConfigData function with the extracted data.
 * @param {string[]} args - The arguments from the cli command (wtachkube config add).
 */

const createConfig = (args) => {
  // Get local and remote paths
  let localDir = args[0];
  const remoteDir = args[1];

  // Get options indexes
  const selectorOption = args.findIndex(arg => arg === '-s');
  const containerNameOption = args.findIndex(arg => arg === '-c');
  const nameSpaceOption = args.findIndex(arg => arg === '-n');
  const reloadOption = args.findIndex(arg => arg === '-r');

  if (
    localDir
    && remoteDir
    && selectorOption > 1
    && (containerNameOption == -1 || containerNameOption > 1)
    && (nameSpaceOption == -1 || nameSpaceOption > 1)
  ) {
    // When the dot is used, get the local path via process.cwd(),
    // which return the current working directory
    localDir = args[0] === '.' ? process.cwd() : args[1];
    
    // Get the options' values
    const selector = args[selectorOption + 1];
    const containerName = containerNameOption !== -1 ? args[containerNameOption + 1] : '';
    const nameSpace = nameSpaceOption !== -1 ? args[nameSpaceOption + 1] : '';
    const reload = reloadOption !== -1;

    // Add the new config
    createConfigData(
      selector,
      localDir,
      remoteDir,
      configData,
      dataFilePath,
      containerName,
      nameSpace,
      reload,
    );
  } else {
    // Show wrong args message if some mandatory args are missing, or args are misplaced   
    configManagerLog('createWrongArgs');
  }
}

/**
 * Remove a config by id, it get the id from the arguments of the cli command (wtachkube config remove) and execute the removeConfigData with the extracted id.
 * @param {string[]} args - The arguments of the cli command (wtachkube config remove).
 */

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

/**
 * List all configs.
 */

const listConfigs = () => {
  listConfigData(configData);
}

module.exports = {
  createConfig,
  listConfigs,
  removeConfig,
}