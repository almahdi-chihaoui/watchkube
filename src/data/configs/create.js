'use strict';

const fs = require('fs');

const {
  configManagerLog,
} = require('../../logger');

/**
 * Add a config to data.json file, it generate new id, create a config object from its paramaters then add it to configs array in the configData object and write the new object in the data file.
 * @param {string} selector - The pod selector.
 * @param {string} localDir - Local directory, which is the path of the sevice's project.
 * @param {string} remoteDir - Remote directory, which is the path where the project is hosted in the cotainer.
 * @param {Object} configData - The data file (data.json) content parsed in JSON object.
 * @param {string} dataFilePath - The path of the data file (data.json).
 * @param {string} containerName - The name of the targeted container (for pod with multiple containers).
 * @param {string} nameSpace - The targeted namespace.
 */

const createConfigData = (
  selector,
  localDir,
  remoteDir,
  configData,
  dataFilePath,
  containerName,
  nameSpace,
) => {
  // Generate a new id
  const newId = configData.configs.length > 0
    ? configData.configs.reduce((prev, curr) => {
      return curr.id > prev.id ? curr : prev;
    }).id + 1
    : 1;

  // New config object
  const newConfig = {
    id: newId,
    selector,
    localDir,
    remoteDir,
    containerName,
    nameSpace,
  }

  // Add the new config
  const newConfigs = [
    ...configData.configs,
    newConfig,
  ];
  const newConfigData = {
    ...configData,
    configs: newConfigs,
  }

  // Write the new data to data.json
  fs.writeFileSync(
    dataFilePath,
    JSON.stringify(newConfigData),
  );

  // Show confirmation message
  configManagerLog('create');
}

module.exports = {
  createConfigData,
}




